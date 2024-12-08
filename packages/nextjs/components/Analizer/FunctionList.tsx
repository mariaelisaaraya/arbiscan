import React from "react";
import type { ContractFunction } from "~~/utils/types";

interface FunctionListProps {
  functions: ContractFunction[];
}

export function FunctionList({ functions }: FunctionListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Contract Functions</h2>
      <div className="space-y-4">
        {functions.map((func, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{func.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  func.risk === "high"
                    ? "bg-red-900/50 text-red-200"
                    : func.risk === "medium"
                      ? "bg-yellow-900/50 text-yellow-200"
                      : "bg-green-900/50 text-green-200"
                }`}
              >
                {func.risk} risk
              </span>
            </div>
            <p className="text-gray-400">{func.description}</p>
            <p className="text-sm text-gray-500 mt-2">Access: {func.access}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
