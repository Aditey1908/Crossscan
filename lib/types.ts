// Transaction data types for CrossScan

export interface TxItem {
  // Core transaction data
  hash: string;
  chainId: number;
  blockNumber: number;
  timestamp: number;
  
  // Addresses
  from: string;
  to: string | null;
  
  // Value
  valueNative?: string; // in wei
  
  // Status
  status: "pending" | "success" | "failed";
  
  // Gas
  gasUsed?: string;
  gasPrice?: string;
  
  // Token transfers (ERC20)
  tokenTransfers?: TokenTransfer[];
  
  // Optional metadata
  methodName?: string;
  input?: string;
}

export interface TokenTransfer {
  token: string;        // token contract address
  tokenSymbol?: string; // e.g., "USDC"
  tokenName?: string;   // e.g., "USD Coin"
  from: string;
  to: string;
  amount: string;       // in smallest unit
  decimals?: number;
}

export interface HyperSyncTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  gas: string;
  gas_price: string;
  input: string;
  nonce: string;
  transaction_index: number;
  block_hash: string;
  block_number: number;
  status?: number;
}

export interface HyperSyncBlock {
  number: number;
  hash: string;
  timestamp: number;
  parent_hash: string;
  gas_used: string;
  gas_limit: string;
}

export interface HyperSyncLog {
  address: string;
  data: string;
  topics: string[];
  block_hash: string;
  block_number: number;
  transaction_hash: string;
  transaction_index: number;
  log_index: number;
}

export interface HyperSyncResponse {
  archive_height: number;
  next_block: number;
  total_execution_time: number;
  data: {
    blocks: HyperSyncBlock[];
    transactions: HyperSyncTransaction[];
    logs: HyperSyncLog[];
  };
}

export interface HyperSyncQuery {
  from_block: number | "latest";
  to_block?: number | "latest";
  logs?: Array<{
    address?: string[];
    topics?: Array<string[] | null>;
  }>;
  transactions?: Array<{
    from?: string[];
    to?: string[];
  }>;
  field_selection: {
    block: string[];
    transaction: string[];
    log: string[];
  };
  max_num_transactions?: number;
}
