/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseContractABI } from "./abiParser";
import { detectContractType } from "./contractTypeDetector";
import { getVerifiedContractData } from "./contractVerification";
import { COMMON_FUNCTIONS_ABI, ERC20_ABI, getDefaultABI } from "./defaultABIs";
import { analyzeOwnerPrivileges } from "./ownerPrivileges";
import { providerManager } from "./provider";
import { detectContractStandard } from "./standardDetector";
import type { ContractAnalysis, ContractError, ContractFunction, ContractType, Network } from "./types";
import { ethers } from "ethers";

async function getContractABI(address: string, network: Network, contractType: ContractType) {
  try {
    const verificationData = await getVerifiedContractData(address, network);
    if (verificationData.isVerified && verificationData.ABI) {
      try {
        const parsedABI = JSON.parse(verificationData.ABI);
        return {
          abi: parsedABI,
          isVerified: true,
          verificationData,
        };
      } catch (parseError) {
        console.warn("Failed to parse verified contract ABI:", parseError);
      }
    }
  } catch (error) {
    console.warn("Contract verification check failed:", error);
  }

  // Fallback to default ABI based on contract type
  return {
    abi: getDefaultABI(contractType),
    isVerified: false,
    verificationData: null,
  };
}

async function analyzeSecurityFeatures(contract: ethers.Contract, bytecode: string) {
  const securityFeatures = {
    hasOwnership: false,
    hasMint: false,
    hasBlacklist: false,
    hasBackdoor: false,
    hasPause: false,
  };

  // Check for ownership pattern
  try {
    const ownerAddress = await contract.owner();
    securityFeatures.hasOwnership = Boolean(ownerAddress);
  } catch (error) {
    console.debug("No owner function found:", error);
  }

  // Check for pause functionality
  try {
    await contract.paused();
    securityFeatures.hasPause = true;
  } catch (error) {
    console.debug("No pause function found:", error);
  }

  // Check for mint function
  const mintSelector = ethers.id("mint(address,uint256)").slice(2, 10);
  securityFeatures.hasMint = bytecode.toLowerCase().includes(mintSelector.toLowerCase());

  // Check for blacklist function
  const blacklistSelector = ethers.id("blacklist(address)").slice(2, 10);
  securityFeatures.hasBlacklist = bytecode.toLowerCase().includes(blacklistSelector.toLowerCase());

  // Check for dangerous patterns in bytecode
  const selfdestruct = ethers.id("selfdestruct()").slice(2, 10);
  const delegatecall = ethers.id("delegatecall(address,bytes)").slice(2, 10);

  const bytecodeLC = bytecode.toLowerCase();
  securityFeatures.hasBackdoor =
    bytecodeLC.includes(selfdestruct.toLowerCase()) || bytecodeLC.includes(delegatecall.toLowerCase());

  return securityFeatures;
}

async function getBasicTokenInfo(contract: ethers.Contract) {
  try {
    const hasTotalSupply = typeof contract.totalSupply === "function";
    const hasDecimals = typeof contract.decimals === "function";
    const promises = [
      contract.name().catch(() => "Unknown"),
      contract.symbol().catch(() => "Unknown"),
      hasDecimals ? contract.decimals().catch(() => 18) : Promise.resolve(18),
      hasTotalSupply ? contract.totalSupply().catch(() => "Unknown") : Promise.resolve("Unknown"),
    ];

    const [name, symbol, decimals, totalSupply] = await Promise.all(promises);

    return { name, symbol, decimals, totalSupply };
  } catch (error) {
    console.error("Error fetching basic token info:", error);
    return { name: "Unknown", symbol: "Unknown", decimals: undefined, totalSupply: "Unknown" };
  }
}

export async function analyzeContract(address: string, network: Network): Promise<ContractAnalysis> {
  if (!ethers.isAddress(address)) {
    throw {
      code: "INVALID_ADDRESS",
      message: "Invalid contract address format",
    };
  }

  try {
    const provider = await providerManager.getProvider(network.id);

    // Detect contract standard
    const contractStandard = await detectContractStandard(provider, address);

    const contract = new ethers.Contract(address, ERC20_ABI, provider);
    const bytecode = await provider.getCode(address);
    if (bytecode === "0x") {
      throw {
        code: "CONTRACT_NOT_FOUND",
        message: `No contract found at the provided address on ${network.name}`,
      };
    }

    const { name, symbol, decimals, totalSupply } = await getBasicTokenInfo(contract);

    const contractInfo = {
      name,
      symbol,
      decimals,
      totalSupply,
    };

    // Get full ABI and verification status
    const { abi, isVerified, verificationData } = await getContractABI(address, network, contractStandard.id);

    // Analyze security features
    const securityFeatures = await analyzeSecurityFeatures(contract, bytecode);

    // Parse functions and events from ABI
    const { functions, events } = parseContractABI(abi);

    // Analyze owner privileges
    const ownerPrivileges = await analyzeOwnerPrivileges(provider, address);

    // Build security issues list
    const securityIssues: string[] = [];
    if (securityFeatures.hasOwnership) {
      securityIssues.push("Contract has an owner with special privileges");
    }
    if (securityFeatures.hasMint) {
      securityIssues.push("Contract includes minting capability");
    }
    if (securityFeatures.hasBlacklist) {
      securityIssues.push("Contract includes blacklisting functionality");
    }
    if (securityFeatures.hasBackdoor) {
      securityIssues.push("Contract contains potential backdoor (selfdestruct or delegatecall)");
    }

    // Get owner address if available
    let ownerAddress;
    try {
      ownerAddress = await contract.owner();
    } catch (error) {
      console.debug("No owner function found:", error);
    }

    return {
      ...contractInfo,
      ownerAddress,
      contractType: contractStandard.id,
      isVerified,
      sourceCode: verificationData?.sourceCode,
      compiler: verificationData?.compiler,
      implementation: verificationData?.implementation,
      ...securityFeatures,
      functions,
      events,
      ownerPrivileges,
      securityIssues,
      network,
      contractAddress: address,
    };
  } catch (error) {
    console.error("Contract analysis error:", error);
    if ((error as ContractError).code) {
      throw error;
    }
    throw {
      code: "ANALYSIS_ERROR",
      message: `Error analyzing contract on ${network.name}. Please verify the contract address and network.`,
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
