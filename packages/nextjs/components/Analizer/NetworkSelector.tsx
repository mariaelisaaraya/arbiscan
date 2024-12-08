import React from "react";
import { Network } from "lucide-react";
import { NETWORKS } from "~~/utils/networks";
import type { Network as NetworkType } from "~~/utils/types";

interface NetworkSelectorProps {
  selectedNetwork: NetworkType;
  onNetworkChange: (network: NetworkType) => void;
}

export function NetworkSelector({ selectedNetwork, onNetworkChange }: NetworkSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Network size={20} className="text-gray-400" />
      <select
        value={selectedNetwork.id}
        onChange={e => {
          const network = NETWORKS.find(n => n.id === Number(e.target.value));
          if (network) onNetworkChange(network);
        }}
        className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        {NETWORKS.map(network => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </select>
    </div>
  );
}