import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatHash(hash: string, chars = 6): string {
  if (!hash) return "";
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

export function formatEther(value: string | bigint, decimals = 4): string {
  const num = typeof value === "string" ? BigInt(value) : value;
  const formatted = Number(num) / 1e18;
  return formatted.toFixed(decimals);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: "Ethereum",
    11155111: "Sepolia",
    80002: "Amoy",
    84532: "Base Sepolia",
    421614: "Arbitrum Sepolia",
    11155420: "Optimism Sepolia",
  };
  return chains[chainId] || `Chain ${chainId}`;
}

export function getExplorerUrl(chainId: number, hash: string): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    11155111: "https://sepolia.etherscan.io",
    80002: "https://www.oklink.com/amoy",
    84532: "https://sepolia.basescan.org",
    421614: "https://sepolia.arbiscan.io",
    11155420: "https://sepolia-optimism.etherscan.io",
  };
  const base = explorers[chainId] || "https://etherscan.io";
  return `${base}/tx/${hash}`;
}
