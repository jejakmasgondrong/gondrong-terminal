'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, ChevronDown, RefreshCw, Plus, X } from 'lucide-react';

const TradingViewChart = dynamic(
  () => import('@/components/features/chart/TradingViewChart').then((mod) => mod.TradingViewChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] bg-[#131722] rounded-xl">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/40 text-sm mt-3 font-mono">Loading chart...</p>
        </div>
      </div>
    ),
  }
);

// TradingView supported pairs
const tradingViewPairs = [
  { label: 'SOL/USDT', value: 'BINANCE:SOLUSDT', exchange: 'Binance' },
  { label: 'BTC/USDT', value: 'BINANCE:BTCUSDT', exchange: 'Binance' },
  { label: 'ETH/USDT', value: 'BINANCE:ETHUSDT', exchange: 'Binance' },
  { label: 'BONK/USDT', value: 'BINANCE:BONKUSDT', exchange: 'Binance' },
  { label: 'JUP/USDT', value: 'BINANCE:JUPUSDT', exchange: 'Binance' },
  { label: 'DOGE/USDT', value: 'BINANCE:DOGEUSDT', exchange: 'Binance' },
  { label: 'ADA/USDT', value: 'BINANCE:ADAUSDT', exchange: 'Binance' },
  // Gold pairs - pake OANDA atau FX_IDC
  { label: 'XAU/USD', value: 'OANDA:XAUUSD', exchange: 'OANDA' },
  { label: 'XAU/USD', value: 'FX_IDC:XAUUSD', exchange: 'FX_IDC' },
  // Solana Gold token - fallback
  { label: 'XAU/SOL', value: 'BINANCE:XAUUSDT', exchange: 'Binance' },
];

const intervals = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1D', value: 'D' },
  { label: '1W', value: 'W' },
];

// Get unique symbols for dropdown
const uniquePairs = tradingViewPairs.reduce((acc, curr) => {
  if (!acc.find(p => p.label === curr.label)) {
    acc.push(curr);
  }
  return acc;
}, [] as typeof tradingViewPairs);

export default function ChartPage() {
  const [symbol, setSymbol] = useState('BINANCE:SOLUSDT');
  const [interval, setInterval] = useState('15');
  const [key, setKey] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [customPairs, setCustomPairs] = useState<string[]>([]);
  const [showAddPair, setShowAddPair] = useState(false);
  const [newPair, setNewPair] = useState('');

  useEffect(() => {
    setIsClient(true);
    // Load custom pairs from localStorage
    const saved = localStorage.getItem('gondrong_pairs');
    if (saved) {
      try {
        setCustomPairs(JSON.parse(saved));
      } catch {
        setCustomPairs([]);
      }
    }
  }, []);

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const addCustomPair = () => {
    if (newPair.trim() && !customPairs.includes(newPair.trim())) {
      const updated = [...customPairs, newPair.trim()];
      setCustomPairs(updated);
      localStorage.setItem('gondrong_pairs', JSON.stringify(updated));
      setNewPair('');
      setShowAddPair(false);
    }
  };

  const removeCustomPair = (pair: string) => {
    const updated = customPairs.filter(p => p !== pair);
    setCustomPairs(updated);
    localStorage.setItem('gondrong_pairs', JSON.stringify(updated));
  };

  // All available pairs
  const allPairs = [
    ...uniquePairs,
    ...customPairs.map(p => ({ 
      label: p, 
      value: p.includes(':') ? p : `BINANCE:${p}`,
      exchange: 'Custom' 
    }))
  ];

  const currentPair = allPairs.find(p => p.value === symbol);
  const displayName = currentPair?.label || symbol.split(':')[1] || symbol;

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text tracking-tight">Chart</h1>
            <p className="text-white/30 text-sm mt-0.5">Advanced TradingView integration</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[600px] bg-[#131722] rounded-xl">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/40 text-sm mt-3 font-mono">Loading...</p>
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
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Chart</h1>
          <p className="text-white/30 text-sm mt-0.5">Advanced TradingView integration</p>
        </div>
        <button
          onClick={handleRefresh}
          className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/60">Refresh</span>
        </button>
      </div>

      {/* Chart Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 border border-white/5">
          <Search className="w-4 h-4 text-white/30" />
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-transparent text-white text-sm outline-none border-none min-w-[120px] cursor-pointer max-w-[200px]"
          >
            <optgroup label="Popular">
              {allPairs.map((pair) => (
                <option key={pair.value} value={pair.value} className="bg-[#0a0a12] py-2">
                  {pair.label} {pair.exchange !== 'Custom' ? `(${pair.exchange})` : '⭐'}
                </option>
              ))}
            </optgroup>
            {customPairs.length > 0 && (
              <optgroup label="Custom">
                {customPairs.map((pair) => (
                  <option key={pair} value={pair} className="bg-[#0a0a12] py-2">
                    {pair} ⭐
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <ChevronDown className="w-3 h-3 text-white/20" />
        </div>

        {/* Add custom pair button */}
        <button
          onClick={() => setShowAddPair(!showAddPair)}
          className="glass hover-lift rounded-lg px-3 py-2 border border-white/5 text-white/60 hover:text-white/80 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Timeframes */}
        <div className="flex gap-1 glass rounded-lg p-1 border border-white/5">
          {intervals.map((int) => (
            <button
              key={int.value}
              onClick={() => setInterval(int.value)}
              className={`
                px-3 py-1.5 rounded-md text-xs font-mono transition-all
                ${interval === int.value 
                  ? 'bg-[#00ff88]/10 text-[#00ff88]' 
                  : 'text-white/40 hover:text-white/70'
                }
              `}
            >
              {int.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add pair modal */}
      {showAddPair && (
        <div className="glass rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newPair}
              onChange={(e) => setNewPair(e.target.value)}
              placeholder="Enter pair (e.g. XAUUSDC or BINANCE:XAUUSDC)"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-[#a855f7]/30"
              onKeyDown={(e) => e.key === 'Enter' && addCustomPair()}
            />
            <button
              onClick={addCustomPair}
              className="px-4 py-2 bg-gradient-to-r from-[#00ff88] to-[#a855f7] rounded-lg text-white text-sm font-medium"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddPair(false)}
              className="px-4 py-2 glass rounded-lg text-white/60 text-sm"
            >
              Cancel
            </button>
          </div>
          <p className="text-[10px] text-white/20 font-mono mt-2">
            Format: XAUUSDC or BINANCE:XAUUSDC or FX_IDC:XAUUSD
          </p>
        </div>
      )}

      {/* Custom pairs list */}
      {customPairs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customPairs.map((pair) => (
            <div key={pair} className="glass rounded-lg px-3 py-1.5 border border-white/5 flex items-center gap-2">
              <span className="text-xs text-white/60 font-mono">{pair}</span>
              <button
                onClick={() => removeCustomPair(pair)}
                className="text-white/20 hover:text-red-400 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="glass rounded-xl p-1 border border-white/5">
        <TradingViewChart 
          key={key}
          symbol={symbol}
          theme="dark"
          interval={interval}
          height={600}
        />
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Pair</p>
          <p className="text-sm font-semibold text-white">{displayName}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Exchange</p>
          <p className="text-sm font-semibold text-white">
            {currentPair?.exchange || 'TradingView'}
          </p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Timeframe</p>
          <p className="text-sm font-semibold text-white">
            {intervals.find(i => i.value === interval)?.label || interval}
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
    </div>
  );
}
