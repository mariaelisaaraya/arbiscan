import { ethers } from "ethers";

export interface OwnerPrivilege {
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  confirmed: boolean;
}

const OWNER_FUNCTION_SIGNATURES = {
  // Token Supply Control
  "mint(address,uint256)": {
    name: "Mint Tokens",
    description: "Can create new tokens at will",
    severity: "high",
  },
  "burn(address,uint256)": {
    name: "Burn Tokens",
    description: "Can destroy tokens from any address",
    severity: "high",
  },
  "pause()": {
    name: "Pause Transfers",
    description: "Can freeze all token transfers",
    severity: "high",
  },
  "unpause()": {
    name: "Unpause Transfers",
    description: "Can unfreeze token transfers",
    severity: "medium",
  },

  // Access Control
  "addToBlacklist(address)": {
    name: "Blacklist Addresses",
    description: "Can restrict addresses from transferring tokens",
    severity: "high",
  },
  "removeFromBlacklist(address)": {
    name: "Remove from Blacklist",
    description: "Can remove addresses from blacklist",
    severity: "medium",
  },
  "setMaxTransferAmount(uint256)": {
    name: "Set Transfer Limits",
    description: "Can modify maximum transfer amounts",
    severity: "high",
  },

  // Contract Control
  "upgradeContract(address)": {
    name: "Upgrade Contract",
    description: "Can modify contract logic",
    severity: "high",
  },
  "transferOwnership(address)": {
    name: "Transfer Ownership",
    description: "Can transfer contract ownership to another address",
    severity: "high",
  },
  "renounceOwnership()": {
    name: "Renounce Ownership",
    description: "Can permanently remove owner privileges",
    severity: "low",
  },

  // Fee Control
  "setFee(uint256)": {
    name: "Modify Fees",
    description: "Can change transaction fees",
    severity: "high",
  },
  "withdrawFees()": {
    name: "Withdraw Fees",
    description: "Can withdraw accumulated fees",
    severity: "high",
  },
};

export async function analyzeOwnerPrivileges(
  provider: ethers.Provider,
  contractAddress: string,
): Promise<OwnerPrivilege[]> {
  const privileges: OwnerPrivilege[] = [];

  // Get contract bytecode and function signatures
  const bytecode = await provider.getCode(contractAddress);
  const bytecodeStr = bytecode.toLowerCase();

  // Check each privilege
  for (const [signature, info] of Object.entries(OWNER_FUNCTION_SIGNATURES)) {
    // Generate function selector
    const functionHash = ethers.id(signature).slice(0, 10).toLowerCase();

    // Check if function exists in bytecode
    const hasFunction = bytecodeStr.includes(functionHash.slice(2));

    //ObserveJEG function  ->  Severity
    if (hasFunction) {
      privileges.push({
        name: info.name,
        description: info.description,
        severity: info.severity as "high" | "low" | "medium",
        confirmed: true,
      });
    }
  }

  return privileges;
}
