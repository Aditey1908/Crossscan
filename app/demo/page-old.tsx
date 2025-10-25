"use client";

import { Navbar } from "@/components/Navbar";
import {
    executeBridge,
    getSupportedChains,
    getSupportedTokens,
    isNexusReady,
    type BridgeOperation
} from "@/lib/nexusClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function DemoPage() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [isNexusInitialized, setIsNexusInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bridgeResult, setBridgeResult] = useState<{
    success: boolean;
    transactionHash?: string;
    explorerUrl?: string;
    sourceChainId: number;
    destinationChainId: number;
    amount: string;
    token: string;
    timestamp: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [selectedToken, setSelectedToken] = useState<SUPPORTED_TOKENS>("ETH");
  const [amount, setAmount] = useState("0.001");
  const [sourceChain, setSourceChain] = useState<number>(NEXUS_CHAINS.SEPOLIA);
  const [destinationChain, setDestinationChain] = useState<number>(NEXUS_CHAINS.BASE_SEPOLIA);

  // Initialize Nexus when wallet is connected
  useEffect(() => {
    const initNexus = async () => {
      if (isConnected && walletClient && !isNexusReady()) {
        try {
          setLoading(true);
          setError(null);
          
          // Get the provider from wagmi's wallet client
          const provider = walletClient as EthereumProvider;
          await initializeNexus(provider);
          setIsNexusInitialized(true);
          
          console.log("Nexus initialized successfully");
        } catch (err) {
          console.error("Failed to initialize Nexus:", err);
          setError("Failed to initialize Nexus SDK. This might be expected in development.");
        } finally {
          setLoading(false);
        }
      } else if (isNexusReady()) {
        setIsNexusInitialized(true);
      }
    };

    initNexus();
  }, [isConnected, walletClient]);

  const handleBridge = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!isNexusReady()) {
      setError("Nexus SDK not initialized");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setBridgeResult(null);

      const bridgeOperation: BridgeOperation = {
        token: selectedToken,
        amount: amount,
        sourceChainId: sourceChain,
        destinationChainId: destinationChain,
        recipient: address,
      };

      console.log("Executing bridge operation:", bridgeOperation);
      const result = await executeBridge(bridgeOperation);
      
      setBridgeResult(result);
      console.log("Bridge completed:", result);
      
    } catch (err: unknown) {
      console.error("Bridge failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Bridge operation failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateBridge = async () => {
    // For development - simulate a successful bridge
    setBridgeResult({
      success: true,
      transactionHash: "0x" + Math.random().toString(16).slice(2, 66),
      explorerUrl: `https://sepolia.etherscan.io/tx/0x${Math.random().toString(16).slice(2, 66)}`,
      sourceChainId: sourceChain,
      destinationChainId: destinationChain,
      amount: amount,
      token: selectedToken,
      timestamp: Date.now(),
    });
  };

  const supportedChains = getSupportedChains();
  const supportedTokens = getSupportedTokens();

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
              Cross-chain bridge & execute functionality
            </p>
            {isNexusInitialized && (
              <div className="mt-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-sm rounded border border-green-500/20">
                  ✅ Nexus SDK Connected
                </span>
              </div>
            )}
          </div>

          {/* Connection Status */}
          {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center mb-8">
              <p className="text-yellow-500 font-semibold">
                👛 Please connect your wallet to continue
              </p>
            </div>
          )}

          {/* Bridge Interface */}
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

            {/* Bridge Form */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token
                </label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value as SUPPORTED_TOKENS)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {supportedTokens.map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.001"
                  min="0"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              {/* Chain Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    From Chain
                  </label>
                  <select
                    value={sourceChain}
                    onChange={(e) => setSourceChain(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={NEXUS_CHAINS.SEPOLIA}>Ethereum Sepolia</option>
                    <option value={NEXUS_CHAINS.BASE_SEPOLIA}>Base Sepolia</option>
                    <option value={NEXUS_CHAINS.ARBITRUM_SEPOLIA}>Arbitrum Sepolia</option>
                    <option value={NEXUS_CHAINS.OPTIMISM_SEPOLIA}>Optimism Sepolia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    To Chain
                  </label>
                  <select
                    value={destinationChain}
                    onChange={(e) => setDestinationChain(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={NEXUS_CHAINS.SEPOLIA}>Ethereum Sepolia</option>
                    <option value={NEXUS_CHAINS.BASE_SEPOLIA}>Base Sepolia</option>
                    <option value={NEXUS_CHAINS.ARBITRUM_SEPOLIA}>Arbitrum Sepolia</option>
                    <option value={NEXUS_CHAINS.OPTIMISM_SEPOLIA}>Optimism Sepolia</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBridge}
                  disabled={!isConnected || loading || sourceChain === destinationChain}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  {loading ? "Bridging..." : "Bridge Tokens"}
                </button>

                <button
                  onClick={handleSimulateBridge}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Simulate
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Bridge Result */}
              {bridgeResult && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h3 className="text-green-400 font-semibold mb-3">🎉 Bridge Successful!</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transaction:</span>
                      <span className="text-blue-400 font-mono">{bridgeResult.transactionHash?.slice(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">{bridgeResult.amount} {bridgeResult.token}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">✅ {bridgeResult.success ? 'Success' : 'Pending'}</span>
                    </div>
                    {bridgeResult.explorerUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <a
                          href={bridgeResult.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View on Explorer →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">✨ What this demo shows:</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>✅ Nexus SDK integration & initialization</li>
                  <li>✅ Cross-chain token bridge functionality</li>
                  <li>✅ Real-time transaction tracking</li>
                  <li>✅ Multi-testnet support</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🔧 SDK Features:</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>🔒 Built-in guardrails & slippage protection</li>
                  <li>⚡ Intent-based cross-chain operations</li>
                  <li>🔗 Support for {supportedChains.length} testnet chains</li>
                  <li>� Real-time gas estimation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
