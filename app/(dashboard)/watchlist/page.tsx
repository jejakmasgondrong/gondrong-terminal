'use client';

import { useEffect, useState } from 'react';
import { 
  Plus, 
  X, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  GripVertical,
  RefreshCw,
  Star,
} from 'lucide-react';
import { useWatchlistStore, WatchlistItem } from '@/lib/stores/watchlistStore';

const popularSymbols = [
  { label: 'SOL/USDT', symbol: 'BINANCE:SOLUSDT' },
  { label: 'BTC/USDT', symbol: 'BINANCE:BTCUSDT' },
  { label: 'ETH/USDT', symbol: 'BINANCE:ETHUSDT' },
  { label: 'BONK/USDT', symbol: 'BINANCE:BONKUSDT' },
  { label: 'JUP/USDT', symbol: 'BINANCE:JUPUSDT' },
  { label: 'XAU/USDC', symbol: 'RAYDIUM:XAUUSDC' },
  { label: 'DOGE/USDT', symbol: 'BINANCE:DOGEUSDT' },
  { label: 'ADA/USDT', symbol: 'BINANCE:ADAUSDT' },
];

export default function WatchlistPage() {
  const { items, addItem, removeItem, updatePrice } = useWatchlistStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Client-only mount
  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      items.forEach((item) => {
        const volatility = 0.005; // 0.5% volatility
        const change = (Math.random() - 0.5) * volatility * 2;
        const newPrice = item.price * (1 + change);
        const change24h = (Math.random() - 0.45) * 0.08;
        const volume = `${Math.floor(Math.random() * 10000 + 1000).toLocaleString()}`;
        
        updatePrice(item.id, newPrice, change24h, volume);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [items, updatePrice, isMounted]);

  const filteredSymbols = popularSymbols.filter(
    (s) =>
      s.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !items.some((i) => i.symbol === s.symbol)
  );

  const handleAddPair = (symbol: string, label: string) => {
    addItem({ symbol, label, exchange: symbol.includes('RAYDIUM') ? 'Raydium' : 'Binance' });
    setShowAddModal(false);
    setSearchTerm('');
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(8);
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculate stats - only on client
  const totalChange = items.reduce((acc, i) => acc + i.change24h, 0);
  const avgChange = items.length > 0 ? (totalChange / items.length) * 100 : 0;
  const avgPrice = items.length > 0 ? items.reduce((acc, i) => acc + i.price, 0) / items.length : 0;

  // Don't render on server
  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Watchlist</h1>
          <p className="text-white/30 text-sm mt-0.5">Real-time price tracking</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/30 text-sm mt-3">Loading watchlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Watchlist</h1>
          <p className="text-white/30 text-sm mt-0.5">Real-time price tracking</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 text-[#00ff88]" />
          <span className="text-sm text-white/80">Add Pair</span>
        </button>
      </div>

      {/* Watchlist Table */}
      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-white/40 text-sm">No pairs in watchlist</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-[#00ff88] text-sm hover:underline"
            >
              Add your first pair
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left text-xs text-white/30 font-mono">
                  <th className="px-4 py-3 w-8">#</th>
                  <th className="px-4 py-3">Pair</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">24h Change</th>
                  <th className="px-4 py-3 text-right">Volume</th>
                  <th className="px-4 py-3 text-right">Exchange</th>
                  <th className="px-4 py-3 w-12 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const isPositive = item.change24h >= 0;
                  
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-all group"
                    >
                      <td className="px-4 py-3 text-white/20 text-xs font-mono">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-[10px] text-white/20 font-mono">{item.symbol}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-sm font-mono font-semibold text-white">
                          ${formatPrice(item.price)}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`text-sm font-mono px-2 py-1 rounded-lg inline-flex items-center gap-1 ${
                            isPositive
                              ? 'text-[#00ff88] bg-[#00ff88]/10'
                              : 'text-[#ff6b6b] bg-[#ff6b6b]/10'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {(item.change24h * 100).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-sm font-mono text-white/60">
                          {item.volume}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-xs text-white/30 font-mono">
                          {item.exchange}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-all text-white/20 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Total Pairs</p>
          <p className="text-lg font-bold text-white">{items.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">24h Change</p>
          <p className={`text-lg font-bold ${avgChange >= 0 ? 'text-[#00ff88]' : 'text-[#ff6b6b]'}`}>
            {avgChange.toFixed(2)}%
          </p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Avg Price</p>
          <p className="text-lg font-bold text-white">
            ${avgPrice.toFixed(2)}
          </p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Status</p>
          <p className="text-sm font-semibold text-[#00ff88] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-pulse" />
            Live
          </p>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add Pair</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Search pairs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30"
              />
            </div>

            <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
              {filteredSymbols.length === 0 ? (
                <p className="text-center text-white/30 text-sm py-4">
                  {searchTerm ? 'No results found' : 'All pairs added'}
                </p>
              ) : (
                filteredSymbols.map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => handleAddPair(pair.symbol, pair.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all text-left"
                  >
                    <span className="text-sm text-white">{pair.label}</span>
                    <span className="text-xs text-white/20 font-mono">{pair.symbol}</span>
                  </button>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] text-white/20 font-mono text-center">
                Pairs are saved locally in your browser
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
