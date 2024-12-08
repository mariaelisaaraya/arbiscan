import { type Network } from "./types";

export const NETWORKS: Network[] = [
  {
    id: 421614,
    name: "Arbitrum Sepolia",
    shortName: "ARB-SEP",
    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc", "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"],
    blockExplorer: "https://sepolia.arbiscan.io",
    apiUrl: "https://api-sepolia.arbiscan.io/api",
    apiKey: "YourArbiscanSepoliaApiKey",
    color: "purple",
  },
  {
    id: 1,
    name: "Ethereum Mainnet",
    shortName: "ETH",
    rpcUrls: ["https://eth-mainnet.g.alchemy.com/v2/demo", "https://cloudflare-eth.com"],
    blockExplorer: "https://etherscan.io",
    apiUrl: "https://api.etherscan.io/api",
    apiKey: "YourEtherscanApiKey",
    color: "blue",
  },
  {
    id: 42161,
    name: "Arbitrum One",
    shortName: "ARB",
    rpcUrls: ["https://arb1.arbitrum.io/rpc", "https://arbitrum-one.public.blastapi.io"],
    blockExplorer: "https://arbiscan.io",
    apiUrl: "https://api.arbiscan.io/api",
    apiKey: "YourArbiscanApiKey",
    color: "indigo",
  },

];