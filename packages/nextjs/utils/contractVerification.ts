import type { Network } from "./types";

export async function getVerifiedContractData(address: string, network: Network) {
  if (!network.apiKey) {
    console.warn(`No API key configured for ${network.name}, skipping verification check`);
    return {
      isVerified: false,
      ABI: null,
      sourceCode: null,
      contractName: null,
      compiler: null,
    };
  }

  const params = new URLSearchParams({
    module: "contract",
    action: "getsourcecode",
    address,
    apikey: network.apiKey,
  });

  try {
    const response = await fetch(`${network.apiUrl}?${params}`);
    const data = await response.json();

    if (data.status !== "1" || !data.result?.[0]) {
      return {
        isVerified: false,
        ABI: null,
        sourceCode: null,
        contractName: null,
        compiler: null,
      };
    }

    const contractData = data.result[0];
    return {
      isVerified: contractData.ABI !== "Contract source code not verified",
      ABI: contractData.ABI,
      sourceCode: contractData.SourceCode,
      contractName: contractData.ContractName,
      compiler: {
        version: contractData.CompilerVersion,
        optimization: contractData.OptimizationUsed === "1",
        runs: parseInt(contractData.Runs || "200", 10),
      },
      implementation: contractData.Implementation || undefined,
    };
  } catch (error) {
    console.error("Error fetching contract verification:", error);
    return {
      isVerified: false,
      ABI: null,
      sourceCode: null,
      contractName: null,
      compiler: null,
    };
  }
}
