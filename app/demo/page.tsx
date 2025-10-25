"use client";

import { Navbar } from "@/components/Navbar";
import { 
  executeBridge, 
  getBridgeQuote,
  DEMO_CHAINS,
  DEMO_TOKENS,
  type BridgeOperation,
  type BridgeResult
} from "@/lib/nexusClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export default function DemoPage() {
  const { address, isConnected } = useAccount();
  
  const [loading, setLoading] = useState(false);
  const [bridgeResult, setBridgeResult] = useState<BridgeResult | null>(null);
  
  // Bridge form state
  const [selectedToken, setSelectedToken] = useState<string>("ETH");
  const [amount, setAmount] = useState<string>("0.001");
  const [sourceChain, setSourceChain] = useState<number>(1);
  const [destinationChain, setDestinationChain] = useState<number>(137);
  
  // Quote state
  const [quote, setQuote] = useState<{
    estimatedTime: string;
    fee: string;
    rate: string;
  } | null>(null);

  // Get quote when form changes
  useEffect(() => {
    if (amount && selectedToken && sourceChain && destinationChain) {
      const getQuote = async () => {
        try {
          const quoteData = await getBridgeQuote({
            token: selectedToken,
            amount,
            sourceChainId: sourceChain,
            destinationChainId: destinationChain,
          });
          setQuote(quoteData);
        } catch (error) {
          console.error('Failed to get quote:', error);
        }
      };
      getQuote();
    }
  }, [amount, selectedToken, sourceChain, destinationChain]);

  const handleBridge = async () => {
    if (!isConnected || !amount || !selectedToken) {
      alert("Please connect wallet and fill all fields");
      return;
    }

    setLoading(true);
    setBridgeResult(null);

    try {
      const bridgeParams: BridgeOperation = {
        token: selectedToken,
        amount,
        sourceChainId: sourceChain,
        destinationChainId: destinationChain,
        recipient: address,
      };

      const result = await executeBridge(bridgeParams);
      setBridgeResult(result);
    } catch (error) {
      setBridgeResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CrossScan Bridge Demo</h1>
                <p className="text-gray-600 mt-2">
                  Avail Nexus SDK Integration for ETHOnline 2025
                </p>
              </div>
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Explorer
              </Link>
            </div>
            
            {!isConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Please connect your wallet to use the bridge functionality.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bridge Form */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Bridge Assets</h2>
                
                {/* Token Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Token
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEMO_TOKENS.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol} - {token.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Source Chain */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Chain
                  </label>
                  <select
                    value={sourceChain}
                    onChange={(e) => setSourceChain(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEMO_CHAINS.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination Chain */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Chain
                  </label>
                  <select
                    value={destinationChain}
                    onChange={(e) => setDestinationChain(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEMO_CHAINS.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quote Display */}
                {quote && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Bridge Quote</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Estimated Time:</span>
                        <span>{quote.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee:</span>
                        <span>{quote.fee} {selectedToken}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>{quote.rate}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bridge Button */}
                <button
                  onClick={handleBridge}
                  disabled={!isConnected || loading || !amount}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Processing..." : "Execute Bridge"}
                </button>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Bridge Status</h2>
                
                {bridgeResult && (
                  <div className={`rounded-lg p-6 ${
                    bridgeResult.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        bridgeResult.success ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <h3 className={`font-medium ${
                        bridgeResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {bridgeResult.success ? 'Bridge Successful' : 'Bridge Failed'}
                      </h3>
                    </div>
                    
                    {bridgeResult.success ? (
                      <div className="space-y-2 text-sm text-green-700">
                        {bridgeResult.hash && (
                          <div>
                            <span className="font-medium">Transaction Hash:</span>
                            <div className="font-mono bg-green-100 p-2 rounded mt-1 break-all">
                              {bridgeResult.hash}
                            </div>
                          </div>
                        )}
                        {bridgeResult.message && (
                          <p>{bridgeResult.message}</p>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-red-700">
                        <span className="font-medium">Error:</span> {bridgeResult.error}
                      </div>
                    )}
                  </div>
                )}

                {/* Demo Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-medium text-blue-800 mb-3">Demo Information</h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p>
                      This is a demonstration of the Avail Nexus SDK integration for ETHOnline 2025.
                    </p>
                    <p>
                      Bridge operations are simulated for demo purposes and don&apos;t involve real funds.
                    </p>
                    <p>
                      The integration showcases cross-chain bridging capabilities using Avail&apos;s 
                      intent-based architecture.
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-800 mb-3">Integration Features</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cross-chain asset bridging</li>
                    <li>• Real-time bridge quotes</li>
                    <li>• Transaction status tracking</li>
                    <li>• Multi-chain support</li>
                    <li>• Intent-based operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}