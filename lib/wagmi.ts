import { createConfig, http } from "wagmi";
import { arbitrumSepolia, baseSepolia, optimismSepolia, polygonAmoy, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Note: WalletConnect temporarily disabled due to invalid Project ID
// Get a valid Project ID from https://cloud.reown.com/ and add:
// import { walletConnect } from "wagmi/connectors";
// Then add walletConnect({ projectId }) to connectors array

export const config = createConfig({
  chains: [sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, optimismSepolia],
  connectors: [
    injected(), // MetaMask, Coinbase Wallet, etc.
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
