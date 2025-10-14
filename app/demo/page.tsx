"use client";

import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm mb-8 inline-flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Avail Nexus Bridge Demo
            </h1>
            <p className="text-gray-400 text-lg">
              Test crosschain bridge & execute functionality
            </p>
          </div>

          {/* Demo Card */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌉</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Bridge Test Token
              </h2>
              <p className="text-gray-400">
                Demo of Avail Nexus SDK integration
              </p>
            </div>

            {/* Coming Soon Badge */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
              <p className="text-yellow-500 font-semibold">
                🚧 Integration in progress
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Avail Nexus SDK will be integrated in Phase 4
              </p>
            </div>

            {/* Info Section */}
            <div className="mt-8 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">What this will do:</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>✅ Bridge test tokens from source chain to destination</li>
                  <li>✅ Execute a contract call on the destination chain</li>
                  <li>✅ Show transaction hash and status</li>
                  <li>✅ Display events in the main transaction feed</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">SDK Features:</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>🔒 Guardrails: Max slippage & gas caps</li>
                  <li>⚡ Simple intent-based API</li>
                  <li>🔗 Support for multiple testnets</li>
                  <li>📝 Detailed feedback documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
