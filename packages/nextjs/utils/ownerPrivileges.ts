import { ethers } from "ethers";

type Severity = "low" | "medium" | "high";

interface OwnerFunctionInfo {
  name: string;
  description: string;
  severity: Severity;
}

export interface OwnerPrivilege {
  name: string;
  description: string;
  severity: Severity;
  confirmed: boolean;
}

const OWNER_FUNCTION_SIGNATURES: Record<string, OwnerFunctionInfo> = {
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
  "renounceOwnership()": {
    name: "Renounce Ownership",
    description: "Can permanently remove owner privileges",
    severity: "low",
  },
  // Continúa con el resto de las funciones...
};

export async function analyzeOwnerPrivileges(
  provider: ethers.Provider,
  contractAddress: string
): Promise<OwnerPrivilege[]> {
  const privileges: OwnerPrivilege[] = [];

  const bytecode = await provider.getCode(contractAddress);
  const bytecodeStr = bytecode.toLowerCase();

  for (const [signature, info] of Object.entries(OWNER_FUNCTION_SIGNATURES)) {
    const functionHash = ethers.id(signature).slice(0, 10).toLowerCase();

    if (bytecodeStr.includes(functionHash.slice(2))) {
      privileges.push({
        name: info.name,
        description: info.description,
        severity: info.severity,
        confirmed: true,
      });
    }
  }

  return privileges;
}
