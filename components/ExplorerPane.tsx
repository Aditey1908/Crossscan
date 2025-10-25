"use client";

import { useFeed } from "@/lib/feedContext";
import { getChainName } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export function ExplorerPane() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedTransaction } = useFeed();

  // Get Blockscout URL from environment
  const blockscoutBaseUrl = process.env.NEXT_PUBLIC_BLOCKSCOUT_BASE_URL;

  // Generate Blockscout transaction URL
  const getBlockscoutUrl = (txHash: string, chainId: number) => {
    // For now, use public Blockscout instances
    const blockscoutUrls: Record<number, string> = {
      11155111: "https://sepolia.blockscout.com", // Sepolia
      84532: "https://base-sepolia.blockscout.com", // Base Sepolia
      421614: "https://arbitrum-sepolia.blockscout.com", // Arbitrum Sepolia
      11155420: "https://optimism-sepolia.blockscout.com", // Optimism Sepolia
    };

    const baseUrl = blockscoutBaseUrl || blockscoutUrls[chainId];
    return baseUrl ? `${baseUrl}/tx/${txHash}` : null;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Explorer Details</h2>
            <p className="text-sm text-gray-400 mt-1">
              {blockscoutBaseUrl ? "Powered by Blockscout Autoscout" : "Powered by Blockscout SDK"}
            </p>
          </div>
          {selectedTransaction && getBlockscoutUrl(selectedTransaction.hash, selectedTransaction.chainId) && (
            <a
              href={getBlockscoutUrl(selectedTransaction.hash, selectedTransaction.chainId)!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="h-[600px] relative">
        {!selectedTransaction ? (
          // Empty state
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🔎</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Select a Transaction
            </h3>
            <p className="text-gray-400 text-sm">
              Click any transaction from the feed to see decoded details, logs, and token information
            </p>
          </div>
        ) : getBlockscoutUrl(selectedTransaction.hash, selectedTransaction.chainId) ? (
          // Blockscout iframe
          <div className="relative h-full">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin text-3xl mb-2">⚡</div>
                  <p className="text-gray-400">Loading transaction details...</p>
                </div>
              </div>
            )}
            <iframe
              src={getBlockscoutUrl(selectedTransaction.hash, selectedTransaction.chainId)!}
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              title="Blockscout Transaction Details"
            />
          </div>
        ) : (
          // Fallback for unsupported chains or missing URLs
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Explorer Not Available
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Blockscout explorer is not available for {getChainName(selectedTransaction.chainId)}
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-2">Transaction Hash:</p>
              <p className="text-sm font-mono text-gray-300 break-all">
                {selectedTransaction.hash}
              </p>
              <p className="text-xs text-gray-400 mt-3 mb-1">Block Number:</p>
              <p className="text-sm text-gray-300">
                #{selectedTransaction.blockNumber}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
