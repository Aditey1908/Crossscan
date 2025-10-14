"use client";

export function ExplorerPane() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white">Explorer Details</h2>
        <p className="text-sm text-gray-400 mt-1">
          Powered by Blockscout SDK
        </p>
      </div>

      {/* Content */}
      <div className="p-12 text-center">
        <div className="text-5xl mb-4">🔎</div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Select a Transaction
        </h3>
        <p className="text-gray-400 text-sm">
          Click any transaction from the feed to see decoded details, logs, and token information
        </p>
      </div>
    </div>
  );
}
