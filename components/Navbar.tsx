"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative text-3xl">🔍</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CrossScan
              </h1>
              <p className="text-xs text-gray-400">Multichain Explorer</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/demo"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Bridge Demo
            </Link>
            <a
              href="https://github.com/yourusername/crossscan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center gap-4">
            <ConnectButton
              chainStatus="icon"
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
