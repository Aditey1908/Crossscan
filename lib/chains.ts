import { http } from "wagmi";
import { mainnet, sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, optimismSepolia } from "wagmi/chains";

export const supportedChains = [
  sepolia,
  polygonAmoy,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
] as const;

export const chainConfig = {
  chains: supportedChains,
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
};

export const chainIcons: Record<number, string> = {
  [sepolia.id]: "🔷",
  [polygonAmoy.id]: "🟣",
  [baseSepolia.id]: "🔵",
  [arbitrumSepolia.id]: "🔴",
  [optimismSepolia.id]: "🔴",
};

export const chainColors: Record<number, string> = {
  [sepolia.id]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [polygonAmoy.id]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  [baseSepolia.id]: "bg-blue-600/10 text-blue-600 border-blue-600/20",
  [arbitrumSepolia.id]: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  [optimismSepolia.id]: "bg-red-500/10 text-red-500 border-red-500/20",
};
