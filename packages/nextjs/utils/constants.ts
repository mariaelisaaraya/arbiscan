import { type ContractStandard } from "./types";

export const ARBITRUM_SEPOLIA_RPC = "https://sepolia-rollup.arbitrum.io/rpc";

export const NETWORK_CONFIG = {
  id: 421614,
  name: "Arbitrum Sepolia",
  rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc", "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"],
};

export const CONTRACT_STANDARDS: ContractStandard[] = [
  {
    id: "ERC20",
    name: "ERC20 Token",
    description: "Fungible token standard",
    interfaces: ["IERC20"],
  },
  {
    id: "ERC721",
    name: "ERC721 NFT",
    description: "Non-fungible token standard",
    interfaces: ["IERC721", "IERC721Metadata"],
  },
  {
    id: "ERC1155",
    name: "ERC1155 Multi-Token",
    description: "Multi-token standard",
    interfaces: ["IERC1155", "IERC1155MetadataURI"],
  },
  {
    id: "CUSTOM",
    name: "Custom Contract",
    description: "Non-standard contract",
    interfaces: [],
  },
];

export const INTERFACE_SELECTORS = {
  // ERC20
  "balanceOf(address)": "0x70a08231",
  "transfer(address,uint256)": "0xa9059cbb",
  "approve(address,uint256)": "0x095ea7b3",
  "allowance(address,address)": "0xdd62ed3e",

  // ERC721
  "ownerOf(uint256)": "0x6352211e",
  "safeTransferFrom(address,address,uint256)": "0x42842e0e",
  "tokenURI(uint256)": "0xc87b56dd",

  // ERC1155
  "balanceOfBatch(address[],uint256[])": "0x4e1273f4",
  "uri(uint256)": "0x0e89341c",
  "setApprovalForAll(address,bool)": "0xa22cb465",
};
