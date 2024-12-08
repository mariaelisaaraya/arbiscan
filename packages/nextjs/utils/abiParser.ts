import type { ContractEvent, ContractFunction } from "./types";

function getFunctionRiskLevel(name: string, inputs: any[], stateMutability: string): "low" | "medium" | "high" {
  // High-risk functions
  if (
    name.includes("upgrade") ||
    name.includes("selfdestruct") ||
    name.includes("delegatecall") ||
    name === "transferOwnership" ||
    name.includes("mint") ||
    name.includes("burn")
  ) {
    return "high";
  }

  // Medium-risk functions
  if (
    stateMutability === "payable" ||
    name.includes("approve") ||
    name.includes("pause") ||
    name.includes("blacklist") ||
    name.includes("whitelist")
  ) {
    return "medium";
  }

  // Low-risk functions
  return "low";
}

function getFunctionDescription(name: string, inputs: any[], stateMutability: string): string {
  const baseDescription = name
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();
  const inputTypes = inputs.map(input => input.type).join(", ");

  let description = `${baseDescription} (${inputTypes})`;

  if (stateMutability === "view") {
    description += " - Read-only function";
  } else if (stateMutability === "pure") {
    description += " - Pure function, no state changes";
  } else if (stateMutability === "payable") {
    description += " - Can receive ETH";
  }

  return description;
}

export function parseContractABI(abi: any[]): {
  functions: ContractFunction[];
  events: ContractEvent[];
} {
  const functions: ContractFunction[] = [];
  const events: ContractEvent[] = [];

  for (const item of abi) {
    if (item.type === "function") {
      const signature = `${item.name}(${item.inputs.map((i: any) => i.type).join(",")})`;

      functions.push({
        name: item.name,
        description: getFunctionDescription(item.name, item.inputs, item.stateMutability),
        signature,
        inputs: item.inputs,
        outputs: item.outputs,
        access: item.stateMutability === "view" ? "read" : "write",
        risk: getFunctionRiskLevel(item.name, item.inputs, item.stateMutability),
        stateMutability: item.stateMutability,
      });
    } else if (item.type === "event") {
      const signature = `${item.name}(${item.inputs.map((i: any) => i.type).join(",")})`;

      events.push({
        name: item.name,
        description: `Event: ${item.name}`,
        signature,
        inputs: item.inputs,
      });
    }
  }

  return { functions, events };
}