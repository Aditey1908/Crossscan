import { createConfig, http } from "wagmi";
import { arbitrumSepolia, baseSepolia, optimismSepolia, polygonAmoy, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const config = createConfig({
  chains: [sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, optimismSepolia],
  connectors: [
    injected(), // MetaMask, Coinbase Wallet, etc.
    walletConnect({ projectId }), // WalletConnect for mobile wallets
  ],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
  ssr: true,
});
