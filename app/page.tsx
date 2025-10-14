import { ExplorerPane } from "@/components/ExplorerPane";
import { Filters } from "@/components/Filters";
import { Navbar } from "@/components/Navbar";
import { TxFeed } from "@/components/TxFeed";
import { FeedProvider } from "@/lib/feedContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      
      <FeedProvider>
        <main className="container mx-auto px-4 py-6">
          {/* Filters & Actions Bar */}
          <Filters />
        
        {/* 3-Pane Layout: Tx Feed (left) + Explorer (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left: Transaction Feed (2/3 width) */}
          <div className="lg:col-span-2">
            <TxFeed />
          </div>
          
          {/* Right: Explorer Pane (1/3 width) */}
          <div className="lg:col-span-1">
            <ExplorerPane />
          </div>
        </div>
      </main>
      
        {/* Footer */}
        <footer className="border-t border-gray-800 mt-12 py-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-400">
            <p className="mb-2">
              Powered by{" "}
              <span className="text-blue-400 font-semibold">Envio</span> •{" "}
              <span className="text-purple-400 font-semibold">Blockscout</span> •{" "}
              <span className="text-green-400 font-semibold">Avail</span>
            </p>
            <p>Built for ETHOnline 2025 🚀</p>
          </div>
        </footer>
      </FeedProvider>
    </div>
  );
}
