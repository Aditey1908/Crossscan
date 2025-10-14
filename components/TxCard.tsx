"use client";

import { chainColors, chainIcons } from "@/lib/chains";
import { TxItem } from "@/lib/types";
import { copyToClipboard, formatAddress, formatEther, formatHash, getChainName } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";

interface TxCardProps {
  tx: TxItem;
  onClick?: () => void;
}

export function TxCard({ tx, onClick }: TxCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timeAgo = formatDistance(new Date(tx.timestamp * 1000), new Date(), {
    addSuffix: true,
  });

  const chainColor = chainColors[tx.chainId] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  const chainIcon = chainIcons[tx.chainId] || "⛓️";

  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-800/50 transition-all cursor-pointer border-l-2 border-transparent hover:border-blue-500"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Main Info */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center gap-2 mb-2">
            {/* Chain Badge */}
            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${chainColor}`}>
              {chainIcon} {getChainName(tx.chainId)}
            </span>

            {/* Status Badge */}
            {tx.status === "success" && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                ✓ Success
              </span>
            )}
            {tx.status === "failed" && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                ✗ Failed
              </span>
            )}
            {tx.status === "pending" && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse">
                ⏳ Pending
              </span>
            )}

            {/* Time */}
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>

          {/* Transaction Hash */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400 font-mono">Tx:</span>
            <button
              onClick={(e) => handleCopy(e, tx.hash)}
              className="text-sm text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 group"
            >
              {formatHash(tx.hash)}
              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            {copied && (
              <span className="text-xs text-green-400">Copied!</span>
            )}
          </div>

          {/* From → To */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">From:</span>
            <button
              onClick={(e) => handleCopy(e, tx.from)}
              className="text-blue-400 hover:text-blue-300 font-mono"
            >
              {formatAddress(tx.from)}
            </button>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400">To:</span>
            {tx.to ? (
              <button
                onClick={(e) => handleCopy(e, tx.to)}
                className="text-blue-400 hover:text-blue-300 font-mono"
              >
                {formatAddress(tx.to)}
              </button>
            ) : (
              <span className="text-gray-500 italic">Contract Creation</span>
            )}
          </div>

          {/* Value */}
          {tx.valueNative && BigInt(tx.valueNative) > 0n && (
            <div className="mt-2 text-sm">
              <span className="text-gray-400">Value:</span>
              <span className="ml-2 text-white font-semibold">
                {formatEther(tx.valueNative)} ETH
              </span>
            </div>
          )}

          {/* Token Transfers */}
          {tx.tokenTransfers && tx.tokenTransfers.length > 0 && (
            <div className="mt-2 text-xs">
              <span className="text-gray-400">
                {tx.tokenTransfers.length} token transfer(s)
              </span>
            </div>
          )}
        </div>

        {/* Right: Block Number */}
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-gray-500">Block</div>
          <div className="text-sm text-gray-300 font-mono">
            #{tx.blockNumber.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
