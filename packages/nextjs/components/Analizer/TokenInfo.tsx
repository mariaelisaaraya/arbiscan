
import { ExternalLink, ShieldAlert, ShieldCheck } from "lucide-react";
import type { ContractAnalysis } from "~~/utils/types";

interface TokenInfoProps {
  analysis: ContractAnalysis;
}

export function TokenInfo({ analysis }: TokenInfoProps) {
  const explorerUrl = `${analysis.network.blockExplorer}/token/${analysis.contractAddress}`;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Token Information</h2>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on {analysis.network.shortName} Explorer
          <ExternalLink size={16} className="ml-1" />
        </a>
      </div>

      {/* Verification Status Alert */}
      <div
        className={`mb-4 p-3 rounded-lg flex items-center ${
          analysis.isVerified
            ? "bg-green-900/50 text-green-200 border border-green-700"
            : "bg-red-900/50 text-red-200 border border-red-700"
        }`}
      >
        {analysis.isVerified ? (
          <>
            <ShieldCheck className="mr-2" size={20} />
            <div>
              <p className="font-semibold">Contract is Verified</p>
              <p className="text-sm opacity-80">Contract is verified and source code is available</p>
            </div>
          </>
        ) : (
          <>
            <ShieldAlert className="mr-2" size={20} />
            <div>
              <p className="font-semibold">Contract is Not Verified</p>
              <p className="text-sm opacity-80">
                Contract is not verified. Analysis will be limited to basic interactions and bytecode analysis.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Contract Type Badge */}
      <div className="mb-4">
        <span className="px-3 py-1 rounded-full text-sm bg-blue-900/50 text-blue-200 border border-blue-700">
          {analysis.contractType} Contract
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Name</p>
          <p className="font-medium">{analysis.name}</p>
        </div>
        {analysis.symbol && (
          <div>
            <p className="text-gray-400">Symbol</p>
            <p className="font-medium">{analysis.symbol}</p>
          </div>
        )}
        {analysis.totalSupply && (
          <div>
            <p className="text-gray-400">Total Supply</p>
            <p className="font-medium">{analysis.totalSupply}</p>
          </div>
        )}
        {typeof analysis.decimals !== "undefined" && (
          <div>
            <p className="text-gray-400">Decimals</p>
            <p className="font-medium">{analysis.decimals}</p>
          </div>
        )}
        <div className="col-span-2">
          <p className="text-gray-400">Owner Address</p>
          <p className="font-medium break-all">
            {analysis.ownerAddress ? (
              <a
                href={`${analysis.network.blockExplorer}/address/${analysis.ownerAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {analysis.ownerAddress}
              </a>
            ) : (
              "No owner"
            )}
          </p>
        </div>
      </div>

      {/* Compiler Information for Verified Contracts */}
      {analysis.isVerified && analysis.compiler && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Compiler Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Compiler Version</p>
              <p className="font-medium">{analysis.compiler.version}</p>
            </div>
            <div>
              <p className="text-gray-400">Optimization</p>
              <p className="font-medium">
                {analysis.compiler.optimization ? `Enabled (${analysis.compiler.runs} runs)` : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Address for Proxy Contracts */}
      {analysis.implementation && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Proxy Contract</h3>
          <p className="text-gray-400">Implementation Address</p>
          <a
            href={`${analysis.network.blockExplorer}/address/${analysis.implementation}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors break-all"
          >
            {analysis.implementation}
          </a>
        </div>
      )}
    </div>
  );
}
