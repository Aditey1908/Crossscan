"use client";

import { supportedChains } from "@/lib/chains";
import { useFeed } from "@/lib/feedContext";

export function Filters() {
  const { 
    selectedChain, 
    setSelectedChain, 
    searchQuery, 
    setSearchQuery,
    filteredTransactions,
    transactions
  } = useFeed();

  // Calculate stats
  const totalTxs = transactions.length;
  const successTxs = transactions.filter(tx => tx.status === "success").length;
  const successRate = totalTxs > 0 ? Math.round((successTxs / totalTxs) * 100) : 0;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left: Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          {/* Chain Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Chain
            </label>
            <select
              value={selectedChain}
              onChange={(e) =>
                setSelectedChain(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Chains</option>
              {supportedChains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Address or tx hash..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right: Bridge Action */}
        <div className="flex items-end">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🌉 Bridge Test Token
          </button>
        </div>
      </div>

      {/* Stats Row */}
            {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-gray-400 text-sm mb-1">Total Txs</div>
          <div className="text-xl font-bold text-white">{totalTxs}</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-gray-400 text-sm mb-1">Success Rate</div>
          <div className="text-xl font-bold text-green-400">
            {totalTxs > 0 ? `${successRate}%` : '--'}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-gray-400 text-sm mb-1">Chains</div>
          <div className="text-xl font-bold text-blue-400">
            {supportedChains.length}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-gray-400 text-sm mb-1">Live Feed</div>
          <div className="text-xl font-bold text-purple-400">
            {totalTxs > 0 ? 'Active' : 'Waiting'}
          </div>
        </div>
      </div>
    </div>
  );
}
