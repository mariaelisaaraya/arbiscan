import React, { useState } from "react";
import { FunctionList } from "./FunctionList";
import { NetworkSelector } from "./NetworkSelector";
import { OwnerPrivileges } from "./OwnerPrivileges";
import { SecurityAnalysis } from "./SecurityAnalysis";
import { TokenInfo } from "./TokenInfo";
import { AlertTriangle } from "lucide-react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { analyzeContract } from "~~/utils/contractAnalyzer";
import { NETWORKS } from "~~/utils/networks";
import type { ContractAnalysis, Network } from "~~/utils/types";

export default function ContractAnalyzer() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("AccessMoreInfoContract");

  const handleAnalyze = async () => {
    if (!tokenAddress) {
      setError("Please enter a token address");
      return;
    }

    setLoading(true);
    setHasPaid(false);
    setError("");
    try {
      const result = await analyzeContract(tokenAddress, selectedNetwork);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "An error occurred while analyzing the contract");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePayForAccess = async () => {
    try {
      if (!connectedAddress || !tokenAddress) {
        console.error("Invalid address: Address cannot be undefined");
        return;
      }

      await writeContractAsync(
        {
          functionName: "accessMoreInfo",
          args: [connectedAddress as `0x${string}`, tokenAddress as `0x${string}`],
          value: parseEther("0.0001"),
        },
        {
          onBlockConfirmation: (txnReceipt) => {
            console.log("📦 Transaction confirmed, blockHash:", txnReceipt.blockHash);
            setHasPaid(true);
          },
        }
      );
    } catch (e) {
      console.error("Error sending token", e);
    }
  };

  return (
    <div className="min-h-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contract Analyzer</h1>
          <p className="text-gray-400">Analyze any token for security and functionality</p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <NetworkSelector selectedNetwork={selectedNetwork} onNetworkChange={setSelectedNetwork} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-xl">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter token contract address"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn btn-primary btn-lg w-32 transition duration-200 ease-in-out disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              <AlertTriangle className="inline-block mr-2" size={20} />
              {error}
            </div>
          )}
        </div>

        {analysis && (
          <div className="space-y-6 min-h-[200px]">
            <TokenInfo analysis={analysis} />
            <SecurityAnalysis analysis={analysis} />
            <OwnerPrivileges privileges={analysis.ownerPrivileges} />

            {analysis.functions.length > 0 && !hasPaid ? (
              <div className="mt-4 text-center">
                <button
                  onClick={handlePayForAccess}
                  className="btn btn-success btn-lg transition duration-200 ease-in-out"
                >
                  Pay to View Contract Functions
                </button>
              </div>
            ) : (
              hasPaid && <FunctionList functions={analysis.functions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}