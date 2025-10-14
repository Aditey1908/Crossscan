"use client";

import { supportedChains } from "@/lib/chains";
import { fetchMultiChainTransactions, TransactionPoller } from "@/lib/envioClient";
import { TxItem } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TxCard } from "./TxCard";

export function TxFeed() {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<TxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address || !isConnected) {
      setTransactions([]);
      return;
    }

    let poller: TransactionPoller | null = null;

    const initializeFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch initial transactions
        const chainIds = supportedChains.map((chain) => chain.id);
        const initialTxs = await fetchMultiChainTransactions(address, chainIds);
        setTransactions(initialTxs);

        // Start polling for new transactions
        poller = new TransactionPoller(
          address,
          chainIds,
          (newTxs) => {
            setTransactions((prev) => {
              // Merge new transactions and remove duplicates
              const txMap = new Map<string, TxItem>();
              [...newTxs, ...prev].forEach((tx) => {
                if (!txMap.has(tx.hash)) {
                  txMap.set(tx.hash, tx);
                }
              });
              // Convert back to array and sort by timestamp
              const merged = Array.from(txMap.values());
              merged.sort((a, b) => b.timestamp - a.timestamp);
              // Keep only last 100 transactions
              return merged.slice(0, 100);
            });
          },
          5000 // Poll every 5 seconds
        );

        poller.start();
      } catch (err) {
        console.error("Error initializing feed:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initializeFeed();

    return () => {
      if (poller) {
        poller.stop();
      }
    };
  }, [address, isConnected]);

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
              <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
              <span>Powered by Envio HyperSync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-800 max-h-[800px] overflow-y-auto">
        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-b border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && transactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="animate-spin text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Loading transactions...
            </h3>
            <p className="text-gray-400 text-sm">
              Scanning chains with Envio HyperSync
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && transactions.length === 0 && !error && (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📡</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No transactions found
            </h3>
            <p className="text-gray-400 text-sm">
              Make a transaction on any supported chain to see it appear here in real-time
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["Sepolia", "Base Sepolia", "Arbitrum Sepolia", "Optimism Sepolia"].map((chain) => (
                <span
                  key={chain}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                >
                  {chain}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Transaction Cards */}
        {transactions.map((tx) => (
          <TxCard 
            key={`${tx.hash}-${tx.chainId}`} 
            tx={tx}
            onClick={() => {
              // TODO: Open explorer pane with tx details
              console.log("Selected tx:", tx);
            }}
          />
        ))}
      </div>

      {/* Footer with count */}
      {transactions.length > 0 && (
        <div className="border-t border-gray-800 p-4 bg-gray-900/80 text-center">
          <p className="text-sm text-gray-400">
            Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} • Updates every 5s
          </p>
        </div>
      )}
    </div>
  );
}
