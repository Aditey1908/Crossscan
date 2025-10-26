"use client";

import { useFeed } from "@/lib/feedContext";
import { getChainName } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function ExplorerPane() {
  const { selectedTransaction } = useFeed();

  // Get Blockscout URL from environment
  const blockscoutBaseUrl = process.env.NEXT_PUBLIC_BLOCKSCOUT_BASE_URL;

  // Generate Blockscout transaction URL using real explorer instances
  const getBlockscoutUrl = (txHash: string, chainId: number) => {
    // Real Blockscout explorer instances for each testnet
    const blockscoutUrls: Record<number, string> = {
      11155111: "https://sepolia.blockscout.com", // Sepolia
      84532: "https://base-sepolia.blockscout.com", // Base Sepolia
      421614: "https://arbitrum-sepolia.blockscout.com", // Arbitrum Sepolia
      11155420: "https://optimism-sepolia.blockscout.com", // Optimism Sepolia
    };

    const baseUrl = blockscoutBaseUrl || blockscoutUrls[chainId];
    if (baseUrl) {
      console.log(`🔗 Blockscout Integration: Generating explorer URL for chain ${chainId}`);
      console.log(`📊 URL: ${baseUrl}/tx/${txHash}`);
    }
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
      <div className="h-[600px] overflow-y-auto relative">
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
          // Rich transaction details (Blockscout integration demo)
          <div className="p-6 space-y-6 min-h-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Transaction Details</h3>
              <p className="text-sm text-gray-400">Powered by Blockscout integration</p>
            </div>

            {/* Transaction Info Cards */}
            <div className="space-y-4">
              {/* Hash */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Transaction Hash</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedTransaction.status === 'success' 
                      ? 'bg-green-900/50 text-green-400' 
                      : selectedTransaction.status === 'failed'
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {selectedTransaction.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-400 break-all">
                  {selectedTransaction.hash}
                </p>
              </div>

              {/* Block & Network */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-300 block mb-1">Block</span>
                  <span className="text-lg font-semibold text-white">#{selectedTransaction.blockNumber}</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-300 block mb-1">Network</span>
                  <span className="text-lg font-semibold text-white">{getChainName(selectedTransaction.chainId)}</span>
                </div>
              </div>

              {/* From/To */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-300 block mb-1">From</span>
                    <span className="text-sm font-mono text-blue-400">{selectedTransaction.from}</span>
                  </div>
                  <div className="text-center text-gray-500">↓</div>
                  <div>
                    <span className="text-sm font-medium text-gray-300 block mb-1">To</span>
                    <span className="text-sm font-mono text-green-400">{selectedTransaction.to}</span>
                  </div>
                </div>
              </div>

              {/* Value */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <span className="text-sm font-medium text-gray-300 block mb-1">Value</span>
                <span className="text-lg font-semibold text-white">
                  {selectedTransaction.valueNative ? 
                    `${(Number(selectedTransaction.valueNative) / 1e18).toFixed(6)} ETH` : 
                    '0 ETH'
                  }
                </span>
              </div>

              {/* Token Transfers */}
              {selectedTransaction.tokenTransfers && selectedTransaction.tokenTransfers.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-300 block mb-3">Token Transfers</span>
                  <div className="space-y-2">
                    {selectedTransaction.tokenTransfers.slice(0, 3).map((transfer, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                        <span className="text-sm text-white">{transfer.tokenSymbol || 'Unknown Token'}</span>
                        <span className="text-sm text-gray-400">
                          {transfer.amount && transfer.decimals 
                            ? (Number(transfer.amount) / Math.pow(10, transfer.decimals)).toFixed(4)
                            : transfer.amount || '0'
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* External Link */}
              <div className="text-center pt-4">
                <a
                  href={getBlockscoutUrl(selectedTransaction.hash, selectedTransaction.chainId)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View in Blockscout Explorer
                </a>
              </div>
            </div>
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
