"use client";

import { useAccount } from "wagmi";
import { TxCard } from "./TxCard";

export function TxFeed() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🔌</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-gray-400">
            Connect your wallet to see real-time transaction activity across chains
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Transaction Feed</h2>
            <p className="text-sm text-gray-400 mt-1">
              Live activity for {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Powered by Envio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-800">
        {/* Empty State */}
        <div className="p-12 text-center">
          <div className="text-5xl mb-4">📡</div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Listening for transactions...
          </h3>
          <p className="text-gray-400 text-sm">
            Make a transaction on any supported chain to see it appear here in real-time
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["Sepolia", "Amoy", "Base Sepolia", "Arbitrum Sepolia", "Optimism Sepolia"].map((chain) => (
              <span
                key={chain}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
              >
                {chain}
              </span>
            ))}
          </div>
        </div>

        {/* Example transactions will appear here */}
        {/* {transactions.map((tx) => (
          <TxCard key={tx.hash} tx={tx} />
        ))} */}
      </div>
    </div>
  );
}
