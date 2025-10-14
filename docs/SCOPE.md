# CrossScan - Project Scope

**Version:** 0.1.0  
**Target:** ETHOnline 2025  
**Prizes:** Envio, Blockscout, Avail  

---

## 🎯 Problem Statement

Multichain users lack a single place to:
1. View live wallet activity across chains
2. Drill into decoded transaction data without context switching
3. Perform simple crosschain actions to prove utility

Current explorers are chain-scoped. Crosschain SDK demos are fragmented. Judges want fast, verifiable builds.

---

## 💡 Solution

**CrossScan** delivers:
- **Live Feed** - Real-time transaction streaming (Envio HyperSync)
- **Deep Details** - Embedded explorer views (Blockscout SDK)
- **Crosschain Action** - One "Bridge & Execute" intent (Avail Nexus)

---

## 🏆 Target Partner Prizes

### Envio
**Tracks:** HyperSync, HyperIndex, Live Web3 Dashboard

**Deliverables:**
- ✅ Real-time tx feed powered by HyperSync/HyperIndex
- ✅ Clear schema and query definition
- ✅ Deployed frontend consuming Envio endpoints
- ✅ Chain and token filters
- ✅ "Powered by Envio" attribution

### Blockscout
**Tracks:** Autoscout Self-Launch, Blockscout SDK Integration

**Deliverables:**
- ✅ Autoscout explorer instance launched for testnet
- ✅ SDK embedded showing tx details and token info
- ✅ Deep links from each transaction row
- ✅ "Open in Blockscout" functionality

### Avail
**Track:** Developer Feedback

**Deliverables:**
- ✅ Nexus SDK installed and called
- ✅ One crosschain "Bridge & Execute" demo
- ✅ AVAIL_FEEDBACK.md with screenshots and feedback
- ✅ Transaction hash verification

---

## 📐 Architecture

### Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Web3:** wagmi, viem, RainbowKit
- **State:** React Query, Zustand
- **Data:** Envio HyperSync/HyperIndex
- **Explorer:** Blockscout SDK
- **Crosschain:** Avail Nexus SDK
- **Deploy:** Vercel (CI/CD)

### Key Features
1. **3-Pane Dashboard**
   - Left: Transaction feed with filters
   - Right: Explorer details pane
   - Top: Action bar with bridge button

2. **Real-Time Updates**
   - 3-5s polling interval
   - Multi-chain support
   - Status badges (pending/success/failed)

3. **Deep Linking**
   - Click any tx → Blockscout SDK details
   - "Open in Autoscout" button
   - Chain-specific explorer links

4. **Crosschain Demo**
   - Simple bridge test token flow
   - Guardrails: slippage & gas caps
   - Success feedback with tx hash

---

## 📊 Success Criteria

### Judging Rubric Alignment
- **Technicality:** 3 SDKs integrated, real data, working crosschain action
- **Originality:** Unified multichain workflow, judge-friendly demo
- **Practicality:** Deployed site, real wallet, live updates
- **Usability:** Clean UI, one-click actions, zero dead ends
- **Wow Factor:** Live stream + explorer + crosschain in one screen

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Day 1)
- Next.js scaffold with TypeScript
- wagmi + RainbowKit setup
- 3-pane dashboard layout
- Vercel deployment

### Phase 2: Envio Integration (Day 1-2)
- HyperSync client
- Transaction feed with polling
- Chain/token filters
- Data model documentation

### Phase 3: Blockscout Integration (Day 2)
- Launch Autoscout instance
- Embed SDK in ExplorerPane
- Deep linking implementation

### Phase 4: Avail Integration (Day 2-3)
- Install Nexus SDK
- Bridge & Execute demo
- AVAIL_FEEDBACK.md

### Phase 5: Polish & Docs (Day 3)
- UX hardening
- README completion
- Demo video
- Submission

---

## 📝 Documentation Structure

- **README.md** - Quick start, features, architecture
- **SCOPE.md** - This file
- **DATA_MODEL.md** - Transaction schema and edge cases
- **AVAIL_FEEDBACK.md** - Nexus SDK feedback with screenshots
- **DEMO_SCRIPT.md** - 3-minute video walkthrough
- **AI_ATTRIBUTION.md** - AI assistance disclosure

---

## 🎬 Demo Flow (3 minutes)

1. **Intro (0:10)** - Connect wallet, show dashboard
2. **Live Feed (1:20)** - Trigger test tx, show real-time update
3. **Explorer (2:00)** - Click row, show Blockscout SDK details
4. **Bridge (2:40)** - Execute crosschain action, show success
5. **Close (3:00)** - Partner shoutouts, GitHub link

---

## ⚠️ Known Limitations

- Polling interval is 5s (production could be 2-3s)
- Testnet-only support
- Basic error handling (no retries yet)
- Desktop-optimized (mobile is functional)

---

## 🔗 Key Links

- **GitHub:** [Coming soon]
- **Live Demo:** [Coming soon]
- **Autoscout:** [Coming soon]
- **Video:** [Coming soon]

---

**Status:** ✅ Phase 1 Complete - Foundation deployed
