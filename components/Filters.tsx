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
    transactions,
    hasActiveFilters,
    clearFilters
  } = useFeed();

  // Calculate stats
  const totalTxs = transactions.length;
  const filteredCount = filteredTransactions.length;
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
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Address or tx hash..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                title="Clear all filters"
              >
                🔄 Reset
              </button>
            </div>
          )}
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

      {/* Filter Status */}
      {hasActiveFilters && totalTxs > 0 && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            🔍 Showing <span className="font-bold">{filteredCount}</span> of <span className="font-bold">{totalTxs}</span> transaction{totalTxs !== 1 ? 's' : ''}
            {selectedChain !== "all" && " • Filtered by chain"}
            {searchQuery && " • Search active"}
          </p>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
