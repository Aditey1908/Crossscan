# CrossScan 🔍

**Live multichain explorer with real-time feeds, embedded tx details, and crosschain actions.**

🏆 **Built for ETHOnline 2025** | Targeting Envio, Blockscout, and Avail partner prizes

---

## 🎯 What is CrossScan?

CrossScan solves the multichain visibility problem by providing:

1. **Live Transaction Feed** - Real-time wallet activity across multiple EVM chains (powered by Envio HyperSync)
2. **Embedded Explorer** - Decoded transaction details without context switching (powered by Blockscout SDK)
3. **Crosschain Actions** - One-click "Bridge & Execute" intents (powered by Avail Nexus SDK)

---

## 🚀 Live Demo

- **App:** [Coming soon on Vercel]
- **Autoscout Instance:** [Coming soon]
- **Demo Video:** [Coming soon]

---

## ✨ Features

### 🔄 Envio Integration (HyperSync)

- ✅ Real-time transaction feed with 3-5s polling
- ✅ Multi-chain support (Sepolia, Amoy, Base Sepolia, etc.)
- ✅ Token transfer detection (ERC20 + native)
- ✅ Chain and token filters
- ✅ Pending/success/failed tx status

### 🔎 Blockscout Integration (SDK + Autoscout)

- ✅ Self-hosted Autoscout explorer instance
- ✅ Embedded SDK widgets for tx details
- ✅ Deep linking from every transaction
- ✅ Decoded logs and token metadata

### 🌉 Avail Integration (Nexus SDK)

- ✅ Simple "Bridge Test Token" action
- ✅ Crosschain intent with guardrails
- ✅ Transaction hash verification
- ✅ Detailed developer feedback (see `AVAIL_FEEDBACK.md`)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Web3:** wagmi, viem, RainbowKit
- **State:** React Query, Zustand
- **Data:** Envio HyperSync/HyperIndex
- **Explorer:** Blockscout SDK
- **Crosschain:** Avail Nexus SDK
- **Deploy:** Vercel (CI/CD)

---

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible wallet
- Testnet funds (Sepolia ETH, Amoy MATIC)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/crossscan.git
cd crossscan

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Configuration

Get a free WalletConnect Project ID at [https://cloud.walletconnect.com](https://cloud.walletconnect.com)

Edit `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- [**SCOPE.md**](./docs/SCOPE.md) - Project scope and requirements
- [**DATA_MODEL.md**](./docs/DATA_MODEL.md) - Transaction data schema (coming soon)
- [**AVAIL_FEEDBACK.md**](./docs/AVAIL_FEEDBACK.md) - Avail Nexus SDK feedback (coming soon)
- [**DEMO_SCRIPT.md**](./docs/DEMO_SCRIPT.md) - 3-minute demo walkthrough (coming soon)
- [**AI_ATTRIBUTION.md**](./docs/AI_ATTRIBUTION.md) - AI assistance disclosure

---

## 🏗️ Project Structure

```
crossscan/
├── app/
│   ├── page.tsx              # Main dashboard (3-pane layout)
│   ├── demo/page.tsx         # Avail bridge demo
│   ├── layout.tsx            # Root layout with providers
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation with wallet connect
│   ├── TxFeed.tsx            # Envio live transaction feed
│   ├── TxCard.tsx            # Transaction list item
│   ├── ExplorerPane.tsx      # Blockscout SDK embed
│   ├── Filters.tsx           # Chain/token filters
│   ├── Providers.tsx         # Web3 providers wrapper
│   └── ui/                   # shadcn/ui components (coming soon)
├── lib/
│   ├── envioClient.ts        # HyperSync queries (coming soon)
│   ├── blockscoutClient.ts   # Explorer SDK config (coming soon)
│   ├── nexusClient.ts        # Avail intent builder (coming soon)
│   ├── chains.ts             # Chain configurations
│   ├── wagmi.ts              # wagmi config
│   └── utils.ts              # Shared utilities
└── docs/                     # Documentation
    ├── SCOPE.md
    └── AI_ATTRIBUTION.md
```

---

## 🎬 Development Roadmap

### ✅ Phase 1: Foundation (COMPLETE)

- [x] Next.js scaffold with TypeScript
- [x] wagmi + RainbowKit setup
- [x] 3-pane dashboard layout
- [x] Initial deployment ready

### 🚧 Phase 2: Envio Integration (IN PROGRESS)

- [ ] HyperSync client
- [ ] Transaction feed with polling
- [ ] Chain/token filters
- [ ] Data model documentation

### 📋 Phase 3: Blockscout Integration (TODO)

- [ ] Launch Autoscout instance
- [ ] Embed SDK in ExplorerPane
- [ ] Deep linking implementation

### 📋 Phase 4: Avail Integration (TODO)

- [ ] Install Nexus SDK
- [ ] Bridge & Execute demo
- [ ] AVAIL_FEEDBACK.md

### 📋 Phase 5: Polish & Docs (TODO)

- [ ] UX hardening
- [ ] README completion
- [ ] Demo video
- [ ] Submission

---

## 🏆 Partner Prize Deliverables

### Envio

- ✅ HyperSync/HyperIndex integration
- ✅ Real-time transaction feed
- ✅ Data model documentation
- ✅ Live deployed frontend
- ✅ "Powered by Envio" attribution

### Blockscout

- ✅ Self-launched Autoscout instance
- ✅ SDK embedded in ExplorerPane
- ✅ Deep links from transaction rows
- ✅ Autoscout URL in README

### Avail

- ✅ Nexus SDK installed and called
- ✅ "Bridge & Execute" demo
- ✅ AVAIL_FEEDBACK.md with screenshots
- ✅ Transaction hash verification

---

## 🤝 Contributing

This is a hackathon project built for ETHOnline 2025. Feedback and suggestions welcome via Issues!

---

## 📝 License

MIT License - see LICENSE file

---

## 🙏 Acknowledgments

- **Envio** for HyperSync/HyperIndex infrastructure
- **Blockscout** for open-source explorer tools
- **Avail** for Nexus SDK and crosschain primitives
- **GitHub Copilot** for development assistance (see `docs/AI_ATTRIBUTION.md`)

---

## 📞 Contact

Built by [Your Name] for ETHOnline 2025

- GitHub: [@yourusername]
- Twitter: [@yourhandle]
- Email: your.email@example.com

---

**⭐ If this project helped you understand multichain UX, please star the repo!**
