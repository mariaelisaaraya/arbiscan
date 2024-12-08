export const ERC20_ABI = [
    // Basic ERC20 Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
  
    // Extended Functions
    "function owner() view returns (address)",
    "function paused() view returns (bool)",
    "function blacklist(address) view returns (bool)",
    "function mintingFinished() view returns (bool)",
    "function cap() view returns (uint256)",
  
    // Events
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event Paused(address account)",
    "event Unpaused(address account)",
  ];
  
  export const ERC721_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256) view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function ownerOf(uint256) view returns (address)",
    "function transferFrom(address,address,uint256)",
    "function safeTransferFrom(address,address,uint256)",
    "function approve(address,uint256)",
    "function getApproved(uint256) view returns (address)",
    "function setApprovalForAll(address,bool)",
    "function isApprovedForAll(address,address) view returns (bool)",
    "function supportsInterface(bytes4) view returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
    "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  ];
  
  export const ERC1155_ABI = [
    "function balanceOf(address,uint256) view returns (uint256)",
    "function balanceOfBatch(address[],uint256[]) view returns (uint256[])",
    "function setApprovalForAll(address,bool)",
    "function isApprovedForAll(address,address) view returns (bool)",
    "function safeTransferFrom(address,address,uint256,uint256,bytes)",
    "function safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)",
    "function uri(uint256) view returns (string)",
    "function supportsInterface(bytes4) view returns (bool)",
    "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
    "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
    "event ApprovalForAll(address indexed account, address indexed operator, bool approved)",
    "event URI(string value, uint256 indexed id)",
  ];
  
  export const COMMON_FUNCTIONS_ABI = [
    "function owner() view returns (address)",
    "function renounceOwnership()",
    "function transferOwnership(address)",
    "function pause()",
    "function unpause()",
    "function paused() view returns (bool)",
    "function implementation() view returns (address)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event Paused(address account)",
    "event Unpaused(address account)",
  ];
  
  export function getDefaultABI(contractType: string): string[] {
    switch (contractType) {
      case "ERC20":
        return [...ERC20_ABI, ...COMMON_FUNCTIONS_ABI];
      case "ERC721":
        return [...ERC721_ABI, ...COMMON_FUNCTIONS_ABI];
      case "ERC1155":
        return [...ERC1155_ABI, ...COMMON_FUNCTIONS_ABI];
      default:
        return COMMON_FUNCTIONS_ABI;
    }
  }