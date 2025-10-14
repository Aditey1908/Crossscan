# CrossScan - Data Model Documentation

**Version:** 1.0  
**Last Updated:** October 14, 2025  

---

## 🎯 Overview

This document defines the transaction data schema used in CrossScan, powered by Envio HyperSync. It covers data structures, edge cases, and transformation logic.

---

## 📊 Core Data Types

### `TxItem` - Normalized Transaction

The primary data structure displayed in the transaction feed:

```typescript
interface TxItem {
  // Core identification
  hash: string;              // Transaction hash (0x...)
  chainId: number;           // EVM chain ID (e.g., 11155111 for Sepolia)
  blockNumber: number;       // Block number
  timestamp: number;         // Unix timestamp (seconds)
  
  // Addresses
  from: string;              // Sender address
  to: string | null;         // Recipient (null for contract creation)
  
  // Value
  valueNative?: string;      // Native token value in wei
  
  // Status
  status: "pending" | "success" | "failed";
  
  // Gas metrics
  gasUsed?: string;          // Gas consumed
  gasPrice?: string;         // Gas price in wei
  
  // Token transfers
  tokenTransfers?: TokenTransfer[];
  
  // Metadata
  methodName?: string;       // Function name (if decoded)
  input?: string;            // Call data (hex)
}
```

### `TokenTransfer` - ERC20 Transfer Event

Extracted from transaction logs:

```typescript
interface TokenTransfer {
  token: string;             // Token contract address
  tokenSymbol?: string;      // e.g., "USDC"
  tokenName?: string;        // e.g., "USD Coin"
  from: string;              // Sender
  to: string;                // Recipient
  amount: string;            // Amount in smallest unit (wei-equivalent)
  decimals?: number;         // Token decimals (default: 18)
}
```

---

## 🔄 Data Flow

```
HyperSync API → envioClient.ts → TxFeed Component → TxCard Display
     ↓              ↓                   ↓                  ↓
  Raw data    Normalization         State Mgmt        UI Render
```

### 1. HyperSync Query

Request structure sent to Envio:

```typescript
{
  from_block: number,
  transactions: [
    { from: [address] },  // Transactions sent by address
    { to: [address] }     // Transactions received by address
  ],
  field_selection: {
    block: ["number", "timestamp", "hash"],
    transaction: [
      "hash", "from", "to", "value",
      "gas_price", "gas", "input", "block_number"
    ],
    log: ["address", "data", "topics", "transaction_hash"]
  }
}
```

### 2. Transformation Logic

**Status Determination:**
- `status === 0` → `"failed"`
- `status === 1 | undefined` → `"success"`
- In mempool → `"pending"` (not yet implemented)

**Token Transfers:**
- Detect ERC20 Transfer events: `topics[0] === TRANSFER_SIGNATURE`
- Extract `from` and `to` from `topics[1]` and `topics[2]`
- Extract `amount` from log `data`

**Value Formatting:**
- Native value stored as string in wei
- Displayed as ETH with `formatEther(value)`

---

## ⚠️ Edge Cases

### 1. Contract Creation
```typescript
{
  to: null,  // No recipient
  input: "0x60806040..."  // Contract bytecode
}
```
**Display:** Show "Contract Creation" instead of recipient address.

### 2. Failed Transactions
```typescript
{
  status: "failed",
  gasUsed: "21000",  // Gas still consumed
  valueNative: "0"   // Value not transferred
}
```
**Display:** Red badge with ✗ icon. Still show gas cost.

### 3. Multiple Token Transfers
Single transaction can emit multiple Transfer events:
```typescript
tokenTransfers: [
  { token: "0xUSDC...", amount: "1000000" },  // 1 USDC
  { token: "0xDAI...", amount: "1000..." }    // 1 DAI
]
```
**Display:** Show count: "2 token transfer(s)".

### 4. Internal Transactions
HyperSync returns only top-level transactions. Internal calls are not tracked separately.

**Limitation:** If a contract calls another contract that transfers tokens, only the initial transaction hash is visible.

### 5. Zero-Value Transactions
```typescript
{
  valueNative: "0",
  tokenTransfers: []  // e.g., contract interaction
}
```
**Display:** Don't show value row. Focus on method/input.

### 6. Pending Transactions
Currently not implemented. HyperSync only returns mined transactions.

**Future:** Could poll mempool via separate RPC.

---

## 🔍 Data Sources

### Supported Chains

| Chain | Chain ID | HyperSync Endpoint |
|-------|----------|-------------------|
| Sepolia | 11155111 | https://sepolia.hypersync.xyz |
| Base Sepolia | 84532 | https://base-sepolia.hypersync.xyz |
| Optimism Sepolia | 11155420 | https://optimism-sepolia.hypersync.xyz |
| Arbitrum Sepolia | 421614 | https://arbitrum-sepolia.hypersync.xyz |

### Query Limits
- **Max blocks per query:** 10,000 (configurable)
- **Max transactions per query:** 1,000
- **Recommended poll interval:** 5 seconds
- **Max stored transactions:** 100 (UI limit)

---

## 📈 Performance Considerations

### Polling Strategy
```typescript
TransactionPoller:
- Initial fetch: Last 20 txs per chain
- Poll interval: 5 seconds
- Track last block per chain
- Only fetch new blocks since last poll
```

### Deduplication
Transactions are deduplicated by hash in React state:
```typescript
const txMap = new Map<string, TxItem>();
[...newTxs, ...prev].forEach((tx) => {
  if (!txMap.has(tx.hash)) {
    txMap.set(tx.hash, tx);
  }
});
```

### Caching
- Last 100 transactions kept in memory
- Older transactions are dropped
- No persistent storage (resets on refresh)

---

## 🛠️ Data Validation

### Required Fields
All `TxItem` objects must have:
- `hash` (non-empty string)
- `chainId` (valid number)
- `from` (valid address)
- `blockNumber` (positive number)
- `timestamp` (positive number)
- `status` (one of: pending, success, failed)

### Optional Fields
- `to` can be `null` for contract creation
- `valueNative` can be missing or "0"
- `tokenTransfers` can be empty array
- `gasUsed`, `gasPrice` may be missing for pending

---

## 🔬 Example Data

### Simple ETH Transfer
```json
{
  "hash": "0xabc123...",
  "chainId": 11155111,
  "blockNumber": 5234567,
  "timestamp": 1728923456,
  "from": "0x1234...",
  "to": "0x5678...",
  "valueNative": "1000000000000000000",
  "status": "success",
  "gasUsed": "21000",
  "gasPrice": "20000000000"
}
```

### Token Transfer
```json
{
  "hash": "0xdef456...",
  "chainId": 84532,
  "blockNumber": 9876543,
  "timestamp": 1728923789,
  "from": "0xabcd...",
  "to": "0xUSDC_CONTRACT...",
  "valueNative": "0",
  "status": "success",
  "tokenTransfers": [
    {
      "token": "0xUSDC_CONTRACT...",
      "from": "0xabcd...",
      "to": "0xef01...",
      "amount": "1000000"
    }
  ]
}
```

---

## 🚀 Future Enhancements

### Planned Features
1. **Token Metadata:** Fetch token symbols/names from chain
2. **USD Values:** Convert amounts to USD using price feeds
3. **Method Decoding:** Decode function calls (4byte.directory)
4. **Pending Txs:** Poll mempool for unconfirmed transactions
5. **NFT Transfers:** Detect ERC721/ERC1155 transfers

### Data Schema Changes
When adding features, maintain backward compatibility:
- Add new optional fields
- Don't remove existing fields
- Version the data model (v1, v2, etc.)

---

## 📚 References

- [Envio HyperSync Docs](https://docs.envio.dev/docs/HyperSync/overview)
- [HyperSync Query Builder](https://builder.hypersync.xyz/)
- [ERC20 Standard](https://eips.ethereum.org/EIPS/eip-20)
- [Ethereum JSON-RPC Spec](https://ethereum.org/en/developers/docs/apis/json-rpc/)

---

**Status:** ✅ Complete and in use
**Next Review:** After Phase 3 (Blockscout integration)
