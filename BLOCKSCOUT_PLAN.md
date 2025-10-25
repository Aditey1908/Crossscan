# Blockscout Integration Plan

## Current Status

- Blockscout SDK packages not found in npm registry
- Need to implement Blockscout integration via iframe or direct API calls
- Focus on Autoscout instance setup first

## Phase 3A: Autoscout Instance Setup

### Prerequisites

- [ ] Request Blockscout credits (via Discord/form)
- [ ] Wait for approval (usually 1-2 hours during hackathon)

### Autoscout Configuration

**Chain:** Sepolia Testnet  
**Name:** CrossScan Sepolia Explorer  
**Label:** crossscan-sepolia  
**RPC URL:** https://rpc.sepolia.org  
**Chain ID:** 11155111

### Expected Timeline

- Form submission: 2 minutes
- Credit approval: 1-2 hours
- Instance deployment: 20-30 minutes
- Total: ~2-3 hours

## Phase 3B: Integration Approach

Since SDK packages aren't available, we'll use:

### Option 1: Iframe Integration (Recommended)

- Embed Autoscout instance in ExplorerPane
- Deep link to specific transactions
- Clean, professional integration

### Option 2: API Integration

- Use Blockscout API directly
- Fetch transaction details
- Custom UI components

### Option 3: Simple Link Integration

- Link to transaction on Autoscout
- "View on Blockscout" buttons
- Minimal but functional

## Implementation Plan

### Step 1: Environment Variables

```env
NEXT_PUBLIC_BLOCKSCOUT_BASE_URL=https://crossscan-sepolia.cloud.blockscout.com
NEXT_PUBLIC_BLOCKSCOUT_API=https://crossscan-sepolia.cloud.blockscout.com/api
```

### Step 2: Update ExplorerPane Component

- Add iframe for Blockscout instance
- Handle deep linking to transactions
- Add loading states

### Step 3: Update TxCard Component

- Add "View on Blockscout" button
- Link to transaction details
- Copy transaction hash functionality

### Step 4: Documentation

- Add Autoscout URL to README
- Document integration approach
- Create screenshots for judges

## Files to Modify

1. **components/ExplorerPane.tsx** - Main integration
2. **components/TxCard.tsx** - Add Blockscout links
3. **lib/utils.ts** - Add Blockscout URL helpers
4. **.env.local** - Environment variables
5. **README.md** - Documentation

## Prize Requirements Checklist

For Blockscout prize, we need:

- [ ] Launch Autoscout instance ⏳
- [ ] SDK embedded in ExplorerPane ⏳
- [ ] Deep links from transaction rows ⏳
- [ ] Autoscout URL in README ⏳

## Next Steps

1. **Check Blockscout credits status** (Discord/email)
2. **If approved:** Deploy Autoscout instance
3. **If waiting:** Implement iframe integration preparation
4. **Alternative:** Work on Avail integration in parallel

## Timeline Estimate

- **With credits ready:** 2-3 hours total
- **Without credits yet:** Prepare integration (30 min), then wait
- **Avail alternative:** 3-4 hours (can do in parallel)

---

**Status:** Ready to proceed based on Blockscout credits availability
**Priority:** High (required for hackathon prize)
**Difficulty:** Medium (iframe integration is straightforward)
