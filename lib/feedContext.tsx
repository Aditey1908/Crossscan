"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { TxItem } from "./types";

interface FeedContextType {
  selectedChain: number | "all";
  setSelectedChain: (chain: number | "all") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  transactions: TxItem[];
  setTransactions: React.Dispatch<React.SetStateAction<TxItem[]>>;
  filteredTransactions: TxItem[];
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [selectedChain, setSelectedChain] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<TxItem[]>([]);

  // Filter transactions based on selected chain and search query
  const filteredTransactions = transactions.filter((tx) => {
    // Chain filter
    const chainMatch = selectedChain === "all" || tx.chainId === selectedChain;
    
    // Search filter
    const query = searchQuery.toLowerCase().trim();
    const searchMatch = !query || 
      tx.hash.toLowerCase().includes(query) ||
      tx.from.toLowerCase().includes(query) ||
      tx.to?.toLowerCase().includes(query);
    
    return chainMatch && searchMatch;
  });

  return (
    <FeedContext.Provider
      value={{
        selectedChain,
        setSelectedChain,
        searchQuery,
        setSearchQuery,
        transactions,
        setTransactions,
        filteredTransactions,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within FeedProvider");
  }
  return context;
}
