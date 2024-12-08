/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CONTRACT_STANDARDS, INTERFACE_SELECTORS } from "./constants";
import type { ContractStandard } from "./types";
import { ethers } from "ethers";

export async function detectContractStandard(provider: ethers.Provider, address: string): Promise<ContractStandard> {
  const bytecode = await provider.getCode(address);
  const supportedInterfaces = new Set<string>();

  // Check for interface support through bytecode analysis
  for (const [functionName, selector] of Object.entries(INTERFACE_SELECTORS)) {
    if (bytecode.includes(selector.slice(2))) {
      supportedInterfaces.add(functionName);
    }
  }

  // Determine the contract standard based on supported interfaces
  if (supportedInterfaces.has("balanceOf(address)") && supportedInterfaces.has("transfer(address,uint256)")) {
    return CONTRACT_STANDARDS.find(s => s.id === "ERC20")!;
  }

  if (supportedInterfaces.has("ownerOf(uint256)") && supportedInterfaces.has("tokenURI(uint256)")) {
    return CONTRACT_STANDARDS.find(s => s.id === "ERC721")!;
  }

  if (supportedInterfaces.has("balanceOfBatch(address[],uint256[])") && supportedInterfaces.has("uri(uint256)")) {
    return CONTRACT_STANDARDS.find(s => s.id === "ERC1155")!;
  }

  return CONTRACT_STANDARDS.find(s => s.id === "CUSTOM")!;
}