import React from "react";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { OwnerPrivilege } from "~~/utils/ownerPrivileges"

interface OwnerPrivilegesProps {
  privileges: OwnerPrivilege[];
}

export function OwnerPrivileges({ privileges }: OwnerPrivilegesProps) {
  if (privileges.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Owner Privileges</h2>
        <div className="flex items-center text-green-400">
          <CheckCircle2 className="mr-2" />
          <span>No special owner privileges detected</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <ShieldAlert className="text-yellow-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold">Owner Privileges</h2>
      </div>

      <div className="space-y-4">
        {privileges.map((privilege, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <AlertCircle
                  className={`mr-2 ${
                    privilege.severity === "high"
                      ? "text-red-500"
                      : privilege.severity === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                  }`}
                  size={16}
                />
                {privilege.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  privilege.severity === "high"
                    ? "bg-red-900/50 text-red-200"
                    : privilege.severity === "medium"
                      ? "bg-yellow-900/50 text-yellow-200"
                      : "bg-blue-900/50 text-blue-200"
                }`}
              >
                {privilege.severity} risk
              </span>
            </div>
            <p className="text-gray-400">{privilege.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}