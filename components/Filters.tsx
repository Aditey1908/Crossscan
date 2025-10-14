"use client";

import { useState } from "react";
import { supportedChains } from "@/lib/chains";

export function Filters() {
  const [selectedChain, setSelectedChain] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Total Txs</p>
          <p className="text-xl font-bold text-white">0</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Success Rate</p>
          <p className="text-xl font-bold text-green-400">--%</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Chains</p>
          <p className="text-xl font-bold text-blue-400">{supportedChains.length}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Live Feed</p>
          <p className="text-xl font-bold text-purple-400">Active</p>
        </div>
      </div>
    </div>
  );
}
