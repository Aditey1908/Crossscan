import axios from "axios";
import type {
    HyperSyncBlock,
    HyperSyncLog,
    HyperSyncQuery,
    HyperSyncResponse,
    TokenTransfer,
    TxItem
} from "./types";

// HyperSync endpoint URLs
const HYPERSYNC_ENDPOINTS: Record<number, string> = {
  11155111: process.env.NEXT_PUBLIC_HYPERSYNC_SEPOLIA || "https://sepolia.hypersync.xyz",
  84532: process.env.NEXT_PUBLIC_HYPERSYNC_BASE_SEPOLIA || "https://base-sepolia.hypersync.xyz",
  11155420: process.env.NEXT_PUBLIC_HYPERSYNC_OPTIMISM_SEPOLIA || "https://optimism-sepolia.hypersync.xyz",
  421614: process.env.NEXT_PUBLIC_HYPERSYNC_ARBITRUM_SEPOLIA || "https://arbitrum-sepolia.hypersync.xyz",
};

// ERC20 Transfer event signature
const ERC20_TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

/**
 * Fetch transactions for a specific address from HyperSync
 */
export async function fetchTransactionsForAddress(
  chainId: number,
  address: string,
  fromBlock: number,
  maxResults: number = 50
): Promise<TxItem[]> {
  const endpoint = HYPERSYNC_ENDPOINTS[chainId];
  
  if (!endpoint) {
    console.warn(`No HyperSync endpoint for chain ${chainId}`);
    return [];
  }

  try {
    // Query for transactions where address is sender or receiver
    const query: HyperSyncQuery = {
      from_block: fromBlock,
      transactions: [
        {
          from: [address.toLowerCase()],
        },
        {
          to: [address.toLowerCase()],
        },
      ],
      field_selection: {
        block: ["number", "timestamp", "hash"],
        transaction: [
          "hash",
          "from",
          "to",
          "value",
          "gas_price",
          "gas",
          "input",
          "nonce",
          "transaction_index",
          "block_number",
          "block_hash",
        ],
        log: ["address", "data", "topics", "transaction_hash", "log_index"],
      },
    };

    const response = await axios.post<HyperSyncResponse>(
      `${endpoint}/query`,
      query,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const { blocks, transactions, logs } = response.data.data;

    // Create a map of block number to block data
    const blockMap = new Map<number, HyperSyncBlock>();
    blocks.forEach((block) => {
      blockMap.set(block.number, block);
    });

    // Create a map of transaction hash to logs
    const logMap = new Map<string, HyperSyncLog[]>();
    logs.forEach((log) => {
      const txLogs = logMap.get(log.transaction_hash) || [];
      txLogs.push(log);
      logMap.set(log.transaction_hash, txLogs);
    });

    // Transform transactions to TxItem format
    const txItems: TxItem[] = transactions
      .slice(0, maxResults)
      .map((tx) => {
        const block = blockMap.get(tx.block_number);
        const txLogs = logMap.get(tx.hash) || [];

        // Extract ERC20 transfers from logs
        const tokenTransfers = extractTokenTransfers(txLogs);

        // Determine status (default to success if not specified)
        const status: "success" | "failed" = 
          tx.status === 0 ? "failed" : "success";

        return {
          hash: tx.hash,
          chainId,
          blockNumber: tx.block_number,
          timestamp: block?.timestamp || Date.now() / 1000,
          from: tx.from,
          to: tx.to,
          valueNative: tx.value,
          status,
          gasUsed: tx.gas,
          gasPrice: tx.gas_price,
          tokenTransfers,
          input: tx.input,
        };
      });

    return txItems;
  } catch (error) {
    console.error(`Error fetching transactions for chain ${chainId}:`, error);
    return [];
  }
}

/**
 * Extract ERC20 token transfers from logs
 */
function extractTokenTransfers(logs: HyperSyncLog[]): TokenTransfer[] {
  const transfers: TokenTransfer[] = [];

  logs.forEach((log) => {
    // Check if this is an ERC20 Transfer event
    if (log.topics[0] === ERC20_TRANSFER_TOPIC && log.topics.length >= 3) {
      const from = "0x" + log.topics[1].slice(26); // Remove padding
      const to = "0x" + log.topics[2].slice(26);
      const amount = log.data;

      transfers.push({
        token: log.address,
        from,
        to,
        amount,
      });
    }
  });

  return transfers;
}

/**
 * Fetch transactions for multiple chains
 */
export async function fetchMultiChainTransactions(
  address: string,
  chainIds: number[],
  fromBlock: number = 0
): Promise<TxItem[]> {
  const promises = chainIds.map((chainId) =>
    fetchTransactionsForAddress(chainId, address, fromBlock, 20)
  );

  const results = await Promise.all(promises);
  
  // Flatten and sort by timestamp (newest first)
  const allTxs = results.flat();
  allTxs.sort((a, b) => b.timestamp - a.timestamp);

  return allTxs;
}

/**
 * Get the latest block number for a chain
 */
export async function getLatestBlock(chainId: number): Promise<number | null> {
  const endpoint = HYPERSYNC_ENDPOINTS[chainId];
  
  if (!endpoint) {
    return null;
  }

  try {
    const query: HyperSyncQuery = {
      from_block: 0,
      field_selection: {
        block: ["number"],
        transaction: [],
        log: [],
      },
    };

    const response = await axios.post<HyperSyncResponse>(
      `${endpoint}/query`,
      query,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

    return response.data.archive_height;
  } catch (error) {
    console.error(`Error fetching latest block for chain ${chainId}:`, error);
    return null;
  }
}

/**
 * Poll for new transactions at regular intervals
 */
export class TransactionPoller {
  private address: string;
  private chainIds: number[];
  private lastBlocks: Map<number, number>;
  private pollInterval: number;
  private intervalId: NodeJS.Timeout | null = null;
  private callback: (txs: TxItem[]) => void;

  constructor(
    address: string,
    chainIds: number[],
    callback: (txs: TxItem[]) => void,
    pollInterval: number = 5000
  ) {
    this.address = address;
    this.chainIds = chainIds;
    this.lastBlocks = new Map();
    this.pollInterval = pollInterval;
    this.callback = callback;
  }

  async start() {
    // Initialize last block numbers
    await Promise.all(
      this.chainIds.map(async (chainId) => {
        const latestBlock = await getLatestBlock(chainId);
        if (latestBlock) {
          this.lastBlocks.set(chainId, latestBlock);
        }
      })
    );

    // Start polling
    this.intervalId = setInterval(() => {
      this.poll();
    }, this.pollInterval);

    // Initial poll
    this.poll();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async poll() {
    try {
      const newTxs: TxItem[] = [];

      for (const chainId of this.chainIds) {
        const lastBlock = this.lastBlocks.get(chainId) || 0;
        const txs = await fetchTransactionsForAddress(
          chainId,
          this.address,
          lastBlock,
          10
        );

        if (txs.length > 0) {
          newTxs.push(...txs);
          // Update last block
          const maxBlock = Math.max(...txs.map((tx) => tx.blockNumber));
          this.lastBlocks.set(chainId, maxBlock);
        }
      }

      if (newTxs.length > 0) {
        // Sort by timestamp
        newTxs.sort((a, b) => b.timestamp - a.timestamp);
        this.callback(newTxs);
      }
    } catch (error) {
      console.error("Error polling for transactions:", error);
    }
  }
}
