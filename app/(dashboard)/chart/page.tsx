'use client';

import { useState, useEffect } from 'react';
import { TradingViewChart } from '@/components/features/chart/TradingViewChart';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';

const popularPairs = [
  { label: 'SOL/USDT', value: 'BINANCE:SOLUSDT' },
  { label: 'BTC/USDT', value: 'BINANCE:BTCUSDT' },
  { label: 'ETH/USDT', value: 'BINANCE:ETHUSDT' },
  { label: 'BONK/USDT', value: 'BINANCE:BONKUSDT' },
  { label: 'JUP/USDT', value: 'BINANCE:JUPUSDT' },
  { label: 'XAU/USDC', value: 'RAYDIUM:XAUUSDC' },
  { label: 'DOGE/USDT', value: 'BINANCE:DOGEUSDT' },
  { label: 'ADA/USDT', value: 'BINANCE:ADAUSDT' },
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

export default function ChartPage() {
  const [symbol, setSymbol] = useState('BINANCE:SOLUSDT');
  const [interval, setInterval] = useState('15');
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const currentPair = popularPairs.find(p => p.value === symbol);
  const displayName = currentPair?.label || symbol.split(':')[1] || symbol;

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
            className="bg-transparent text-white text-sm outline-none border-none min-w-[120px] cursor-pointer"
          >
            {popularPairs.map((pair) => (
              <option key={pair.value} value={pair.value} className="bg-[#0a0a12] py-2">
                {pair.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-white/20" />
        </div>

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

      {/* Quick Info - Dynamic */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Pair</p>
          <p className="text-sm font-semibold text-white">{displayName}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Exchange</p>
          <p className="text-sm font-semibold text-white">
            {symbol.includes('RAYDIUM') ? 'Raydium' : 'Binance'}
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
