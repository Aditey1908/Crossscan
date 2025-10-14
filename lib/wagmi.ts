import { http, createConfig } from "wagmi";
import { sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, optimismSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const config = createConfig({
  chains: [sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, optimismSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
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
