import type { OwnerPrivilege } from "./ownerPrivileges";

export type ContractType = "ERC20" | "ERC721" | "ERC1155" | "CUSTOM";

export interface Network {
  id: number;
  name: string;
  shortName: string;
  rpcUrls: string[];
  blockExplorer: string;
  apiUrl: string;
  apiKey?: string;
  color: string;
}

export interface ContractStandard {
  id: ContractType;
  name: string;
  description: string;
  interfaces: string[];
}

export interface ContractFunction {
  name: string;
  description: string;
  signature: string;
  inputs: {
    name: string;
    type: string;
    indexed?: boolean;
  }[];
  outputs: {
    name: string;
    type: string;
  }[];
  access: string;
  risk: "low" | "medium" | "high";
  stateMutability: string;
}

export interface ContractEvent {
  name: string;
  description: string;
  signature: string;
  inputs: {
    name: string;
    type: string;
    indexed: boolean;
  }[];
}

export interface ContractAnalysis {
  name: string;
  symbol?: string;
  decimals?: number;
  totalSupply?: string;
  ownerAddress?: string;
  contractType: ContractType;
  isVerified: boolean;
  sourceCode?: string;
  compiler?: {
    version: string;
    optimization: boolean;
    runs: number;
  };
  hasOwnership: boolean;
  hasPause: boolean;
  hasMint: boolean;
  hasBlacklist: boolean;
  hasBackdoor: boolean;
  securityIssues: string[];
  functions: ContractFunction[];
  events: ContractEvent[];
  ownerPrivileges: OwnerPrivilege[];
  network: Network;
  contractAddress: string;
  implementation?: string; // For proxy contracts
}

export interface ContractError {
  code: string;
  message: string;
  details?: string;
}
