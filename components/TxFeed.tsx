"use client";

import { supportedChains } from "@/lib/chains";
import { TransactionPoller, fetchMultiChainTransactions, fetchRecentTransactions } from "@/lib/envioClient";
import { useFeed } from "@/lib/feedContext";
import { TxItem } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TxCard } from "./TxCard";

export function TxFeed() {
  const { address, isConnected } = useAccount();
  const { filteredTransactions, setTransactions, transactions, clearFilters, searchQuery } = useFeed();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize feed when address changes
  useEffect(() => {
    let poller: TransactionPoller | null = null;

    const initializeFeed = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const chainIds = supportedChains.map((c) => c.id);
        
        if (address) {
          // Fetch user-specific transactions
          const initialTxs = await fetchMultiChainTransactions(address, chainIds);
          setTransactions(initialTxs);

          // Start polling for new transactions
          poller = new TransactionPoller(
            address,
            chainIds,
            (newTxs: TxItem[]) => {
              setTransactions((prev) => {
                const combined = [...newTxs, ...prev];
                const unique = combined.filter(
                  (tx, index, self) => index === self.findIndex((t) => t.hash === tx.hash)
                );
                return unique.slice(0, 100); // Keep last 100 transactions
              });
            },
            5000 // Poll every 5 seconds
          );
          poller.start();
        } else {
          // Show recent transactions from all chains for demo
          console.log("🔍 No wallet connected - showing recent transactions for demo");
          const recentTxsPromises = chainIds.map(chainId => 
            fetchRecentTransactions(chainId, 3) // 3 transactions per chain
          );
          
          const recentTxsArrays = await Promise.all(recentTxsPromises);
          const allRecentTxs = recentTxsArrays.flat();
          
          // Sort by block number (most recent first)
          allRecentTxs.sort((a, b) => b.blockNumber - a.blockNumber);
          
          setTransactions(allRecentTxs.slice(0, 15)); // Show top 15 recent transactions
        }
      } catch (err) {
        console.error("Failed to initialize feed:", err);
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    initializeFeed();

    // Cleanup
    return () => {
      if (poller) {
        poller.stop();
      }
    };
  }, [address, setTransactions]);

  // Show transactions even when not connected (for demo)
  if (transactions.length === 0 && !isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🔌</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {isConnected ? "No Transactions Found" : "Connect Wallet or View Recent Activity"}
          </h3>
          <p className="text-gray-400">
            {isConnected 
              ? "No transactions found for your address. Try making a transaction on a testnet."
              : "Connect your wallet to see your transactions, or view recent network activity below."
            }
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
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
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
        {isLoading && filteredTransactions.length === 0 && (
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

        {/* Empty State - No transactions at all */}
        {!isLoading && transactions.length === 0 && !error && (
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

        {/* Empty State - Filters active but no results */}
        {!isLoading && transactions.length > 0 && filteredTransactions.length === 0 && !error && (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No matching transactions
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Your filters didn&apos;t match any transactions. Try adjusting your search or chain filter.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Transaction Cards */}
        {filteredTransactions.map((tx) => (
          <TxCard 
            key={`${tx.hash}-${tx.chainId}`} 
            tx={tx}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Footer with count */}
      {filteredTransactions.length > 0 && (
        <div className="border-t border-gray-800 p-4 bg-gray-900/80 text-center">
          <p className="text-sm text-gray-400">
            Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} • Updates every 5s
          </p>
        </div>
      )}
    </div>
  );
}
