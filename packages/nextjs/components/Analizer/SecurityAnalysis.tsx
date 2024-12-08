import React from "react";
import { AlertTriangle, Shield, ShieldAlert } from "lucide-react";
import type { ContractAnalysis } from "~~/utils/types";

interface SecurityAnalysisProps {
  analysis: ContractAnalysis;
}

export function SecurityAnalysis({ analysis }: SecurityAnalysisProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Security Analysis</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Shield className={`mr-2 ${analysis.hasBackdoor ? "text-red-500" : "text-green-500"}`} />
          <span>Backdoor Protection: {analysis.hasBackdoor ? "Vulnerable" : "Secure"}</span>
        </div>
        <div className="flex items-center">
          <ShieldAlert className={`mr-2 ${analysis.hasOwnership ? "text-yellow-500" : "text-green-500"}`} />
          <span>Ownership Control: {analysis.hasOwnership ? "Centralized" : "No owner privileges"}</span>
        </div>
      </div>

      {analysis.securityIssues.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Security Issues</h3>
          <ul className="space-y-2">
            {analysis.securityIssues.map((issue, index) => (
              <li key={index} className="flex items-center text-yellow-400">
                <AlertTriangle className="mr-2" size={16} />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}