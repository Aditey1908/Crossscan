# CrossScan - Multichain Transaction Explorer

A comprehensive multichain transaction explorer built for ETHOnline 2025, integrating Envio HyperSync, Blockscout, and Avail Nexus SDK.

![CrossScan Demo](https://img.shields.io/badge/Demo-Live-green) ![ETHOnline 2025](https://img.shields.io/badge/ETHOnline-2025-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.5+-black)

## 🌟 Features

### 🔍 **Multichain Explorer**

- Real-time transaction feed across multiple testnets
- Address-based transaction filtering and search
- Comprehensive transaction details with token transfers
- Chain-specific filtering (Ethereum, Base, Arbitrum, Optimism, Polygon)

### 🌉 **Cross-Chain Bridge**

- Bridge demo interface powered by Avail Nexus SDK
- Real-time bridge quotes and fee estimation
- Support for ETH, USDC, USDT, and DAI tokens
- Transaction status tracking and monitoring

### 🔗 **Explorer Integration**

- Seamless integration with Blockscout explorers
- Direct links to transaction and address details
- Chain-specific explorer routing
- One-click navigation to external verification

## 🏆 Partner Integrations

### **Envio HyperSync** - Real-time Data Indexing

- High-performance transaction indexing across multiple chains
- Real-time data synchronization with automatic polling
- ERC20 token transfer detection from transaction logs
- Optimized queries with comprehensive error handling

### **Blockscout** - Explorer Integration

- Dynamic explorer URL generation for all supported chains
- Transaction verification and address exploration
- Seamless navigation between CrossScan and external explorers
- Chain-specific routing for accurate data verification

### **Avail Nexus SDK** - Cross-Chain Bridging

- Intent-based cross-chain bridge functionality
- Real-time quote generation for bridge operations
- Multi-chain support with testnet compatibility
- Professional bridge interface with status tracking

## 🚀 Live Demo

**Application**: [http://localhost:3000](http://localhost:3000) (when running locally)  
**Repository**: [https://github.com/Aditey1908/Crossscan](https://github.com/Aditey1908/Crossscan)

### Supported Networks

- **Ethereum Sepolia** - Primary testnet
- **Base Sepolia** - L2 scaling solution
- **Arbitrum Sepolia** - Optimistic rollup
- **Optimism Sepolia** - Optimistic rollup
- **Polygon Amoy** - Polygon testnet

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.5+, React 18, TypeScript
- **Styling**: Tailwind CSS, Responsive Design
- **Blockchain**: wagmi, viem, WalletConnect
- **Data Sources**: Envio HyperSync, Blockscout API
- **Bridge Integration**: Avail Nexus SDK
- **Development**: ESLint, TypeScript strict mode

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Aditey1908/Crossscan.git
cd crossscan

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# WalletConnect (Required)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# HyperSync Endpoints (Optional - defaults provided)
NEXT_PUBLIC_HYPERSYNC_SEPOLIA=https://sepolia.hypersync.xyz
NEXT_PUBLIC_HYPERSYNC_BASE_SEPOLIA=https://base-sepolia.hypersync.xyz
NEXT_PUBLIC_HYPERSYNC_OPTIMISM_SEPOLIA=https://optimism-sepolia.hypersync.xyz
NEXT_PUBLIC_HYPERSYNC_ARBITRUM_SEPOLIA=https://arbitrum-sepolia.hypersync.xyz
NEXT_PUBLIC_HYPERSYNC_POLYGON_AMOY=https://polygon-amoy.hypersync.xyz
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🎯 Usage Guide

### Exploring Transactions

1. **Connect Wallet**: Click "Connect Wallet" in the top navigation
2. **View Feed**: Real-time transactions appear automatically
3. **Filter by Chain**: Use the dropdown to filter by specific chains
4. **Search**: Enter transaction hash or address to find specific transactions
5. **View Details**: Click on any transaction card to see full details

### Using the Bridge Demo

1. **Navigate**: Go to `/demo` or click "Bridge Demo"
2. **Select Assets**: Choose token (ETH, USDC, USDT, DAI)
3. **Choose Chains**: Select source and destination chains
4. **Enter Amount**: Specify the amount to bridge
5. **Get Quote**: Real-time fees and estimates appear automatically
6. **Execute**: Click "Execute Bridge" to simulate the operation

### Explorer Integration

- **Transaction Links**: Click "View in Explorer" on any transaction
- **Address Links**: Click on addresses to explore in Blockscout
- **Verification**: External verification through chain-specific explorers

## 🏗️ Architecture

### Component Structure

```
components/
├── Navbar.tsx           # Navigation with wallet connection
├── TxFeed.tsx          # Real-time transaction feed
├── TxCard.tsx          # Individual transaction display
├── Filters.tsx         # Chain and search filtering
├── ExplorerPane.tsx    # Explorer integration
└── ui/                 # Reusable UI components
```

### Data Layer

```
lib/
├── envioClient.ts      # HyperSync integration
├── nexusClient.ts      # Avail Nexus SDK wrapper
├── types.ts           # TypeScript interfaces
├── chains.ts          # Chain configurations
├── utils.ts           # Utility functions
└── wagmi.ts           # Wallet configuration
```

### Key Features

- **Real-time Updates**: Transaction polling every 5 seconds
- **Error Handling**: Comprehensive fallbacks and error boundaries
- **Type Safety**: Full TypeScript coverage with strict mode
- **Responsive Design**: Mobile-friendly interface
- **Performance**: Optimized builds and efficient rendering

## 🎪 Demo Scenarios

### For Judges/Reviewers

1. **Envio Integration**: Connect wallet → view real-time transaction feed
2. **Blockscout Integration**: Click transaction → verify on external explorer
3. **Avail Integration**: Visit `/demo` → simulate cross-chain bridge

### For Development

- **Fallback Data**: Application works without wallet for demonstration
- **Error Resilience**: Graceful handling of API failures
- **Development Mode**: Comprehensive logging and debugging

## 🔧 Development Notes

### Code Quality

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured with recommended rules
- **Formatting**: Consistent code style throughout
- **Error Handling**: Comprehensive try-catch blocks and fallbacks

### Performance

- **Build Time**: ~20-30 seconds optimized compilation
- **Bundle Size**: Efficient code splitting and tree shaking
- **Runtime**: Optimized React rendering and state management
- **API Calls**: Rate limiting and timeout handling

### Testing

- **Development**: Local testing with fallback data
- **Integration**: Real API testing with testnet transactions
- **Error Cases**: Comprehensive error scenario handling

## 🤝 Contributing

This project was developed for ETHOnline 2025. For issues or suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## � License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Aditey**  
📧 Email: [aditeyrk19@gmail.com](mailto:aditeyrk19@gmail.com)  
🐙 GitHub: [@Aditey1908](https://github.com/Aditey1908)  
🔗 Repository: [https://github.com/Aditey1908/Crossscan](https://github.com/Aditey1908/Crossscan)

## 🙏 Acknowledgments

Built for **ETHOnline 2025** with integration of:

- **Envio** - HyperSync real-time blockchain data indexing
- **Blockscout** - Open-source blockchain explorer infrastructure
- **Avail** - Nexus SDK for cross-chain bridge functionality

Special thanks to the ETHOnline organizing team and all the partner projects for providing excellent developer tools and documentation.

---

**CrossScan** - _Where multichain exploration meets cross-chain functionality_ 🌐✨
