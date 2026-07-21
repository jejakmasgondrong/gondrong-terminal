'use client';

import { useState } from 'react';
import { TradingViewChart } from '@/components/features/chart/TradingViewChart';
import { Search, ChevronDown } from 'lucide-react';

const popularPairs = [
  'BINANCE:SOLUSDT',
  'BINANCE:BTCUSDT',
  'BINANCE:ETHUSDT',
  'BINANCE:BONKUSDT',
  'RAYDIUM:XAUUSDC',
];

export default function ChartPage() {
  const [symbol, setSymbol] = useState('BINANCE:SOLUSDT');
  const [interval, setInterval] = useState('15');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Chart</h1>
          <p className="text-white/30 text-sm mt-0.5">Advanced TradingView integration</p>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 border border-white/5">
          <Search className="w-4 h-4 text-white/30" />
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-transparent text-white text-sm outline-none border-none"
          >
            {popularPairs.map((pair) => (
              <option key={pair} value={pair} className="bg-[#0a0a12]">
                {pair.replace('BINANCE:', '').replace('RAYDIUM:', '')}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-white/20" />
        </div>

        <div className="glass rounded-lg px-3 py-2 border border-white/5">
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="bg-transparent text-white text-sm outline-none border-none"
          >
            <option value="1">1m</option>
            <option value="5">5m</option>
            <option value="15">15m</option>
            <option value="30">30m</option>
            <option value="60">1h</option>
            <option value="240">4h</option>
            <option value="D">1D</option>
            <option value="W">1W</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="glass rounded-xl p-1 border border-white/5">
        <TradingViewChart 
          symbol={symbol}
          theme="dark"
          interval={interval}
          height={600}
        />
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Open', value: '$142.50' },
          { label: 'High', value: '$148.20' },
          { label: 'Low', value: '$140.80' },
          { label: 'Volume', value: '1.2M' },
        ].map((item, i) => (
          <div key={i} className="glass rounded-lg px-4 py-3 border border-white/5">
            <p className="text-[10px] text-white/30 font-mono">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
