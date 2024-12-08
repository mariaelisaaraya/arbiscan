import type { ContractType } from "./types";
import { ethers } from "ethers";

const INTERFACE_IDS = {
  ERC165: "0x01ffc9a7",
  ERC721: "0x80ac58cd",
  ERC1155: "0xd9b67a26",
};

export async function detectContractType(contract: ethers.Contract): Promise<ContractType> {
  try {
    // Verificar las funciones básicas del estándar ERC20
    const hasBalanceOf = typeof contract.balanceOf === "function";
    const hasTransfer = typeof contract.transfer === "function";
    const hasTotalSupply = typeof contract.totalSupply === "function";

    if (hasBalanceOf && hasTransfer && hasTotalSupply) {
      try {
        // Intenta llamar funciones adicionales del estándar ERC20
        const [name, symbol, decimals] = await Promise.all([
          contract.name?.(),
          contract.symbol?.(),
          contract.decimals?.(),
        ]);

        if (name && symbol && typeof decimals === "number") {
          return "ERC20";
        }
      } catch {
        // Considera como ERC20 si las funciones mínimas están presentes
        return "ERC20";
      }
    }

    // Comprobar soporte para ERC165
    const supportsERC165 = await contract.supportsInterface?.(INTERFACE_IDS.ERC165);
    if (supportsERC165) {
      // Verificar si es ERC721
      const isERC721 = await contract.supportsInterface(INTERFACE_IDS.ERC721);
      if (isERC721) return "ERC721";

      // Verificar si es ERC1155
      const isERC1155 = await contract.supportsInterface(INTERFACE_IDS.ERC1155);
      if (isERC1155) return "ERC1155";
    }

    return "CUSTOM";
  } catch {
    return "CUSTOM";
  }
}