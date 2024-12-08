import { NETWORKS } from "./networks";
import { ethers } from "ethers";

export class ProviderManager {
  private providers: Map<number, ethers.Provider> = new Map();

  async getProvider(networkId: number): Promise<ethers.Provider> {
    if (this.providers.has(networkId)) {
      return this.providers.get(networkId)!;
    }

    const network = NETWORKS.find(n => n.id === networkId);
    if (!network) {
      throw new Error("Unsupported network");
    }

    let provider: ethers.Provider | null = null;
    let lastError: Error | null = null;

    // Try each RPC URL until one works
    for (const rpcUrl of network.rpcUrls) {
      try {
        provider = new ethers.JsonRpcProvider(rpcUrl);
        await provider.getNetwork(); // Test the connection
        break;
      } catch (error) {
        lastError = error as Error;
        continue;
      }
    }

    if (!provider) {
      throw new Error(`Failed to connect to ${network.name}: ${lastError?.message}`);
    }

    this.providers.set(networkId, provider);
    return provider;
  }
}

export const providerManager = new ProviderManager();
