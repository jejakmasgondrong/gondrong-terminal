'use client';

import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  Activity, 
  Bitcoin,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function DashboardPage() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Market Cap', 
      value: '$2.45T', 
      change: '+2.3%', 
      up: true,
      icon: <DollarSign className="w-4 h-4" />,
    },
    { 
      label: '24h Volume', 
      value: '$68.2B', 
      change: '+5.1%', 
      up: true,
      icon: <Activity className="w-4 h-4" />,
    },
    { 
      label: 'BTC Dominance', 
      value: '54.3%', 
      change: '-0.2%', 
      up: false,
      icon: <Bitcoin className="w-4 h-4" />,
    },
    { 
      label: 'Active Pairs', 
      value: '12', 
      change: '+3', 
      up: true,
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const features = [
    { emoji: '📊', label: 'Chart', desc: 'Advanced TradingView integration' },
    { emoji: '👀', label: 'Watchlist', desc: 'Real-time price tracking' },
    { emoji: '📰', label: 'News', desc: 'Crypto news aggregator' },
    { emoji: '📅', label: 'Calendar', desc: 'Economic events tracker' },
    { emoji: '🤖', label: 'AI Analysis', desc: 'Machine learning predictions' },
    { emoji: '🧮', label: 'Calculator', desc: 'Position sizing & risk' },
    { emoji: '🔗', label: 'Wallet', desc: 'Solana wallet connection' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-white/30 text-sm mt-0.5">Welcome back, Trader</p>
        </div>
        <div className="glass px-5 py-2 rounded-lg min-w-[120px] text-right">
          <p className="text-[9px] text-white/20 font-mono tracking-widest">LIVE</p>
          <p className="text-xl font-mono font-semibold text-[#00ff88]">
            {time || '--:--:--'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass hover-lift rounded-xl p-5 border border-white/5 shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                stat.up ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-[#ff6b6b] bg-[#ff6b6b]/10'
              }`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-white/40 text-xs font-mono">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-base font-semibold text-white">Features</h2>
          <span className="text-[10px] text-white/20 font-mono">(coming soon)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass hover-lift rounded-lg p-4 text-center border border-white/5"
            >
              <div className="text-3xl mb-1.5">{feature.emoji}</div>
              <p className="text-sm font-medium text-white">{feature.label}</p>
              <p className="text-[10px] text-white/25 font-mono mt-0.5">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between text-[9px] text-white/15 font-mono">
        <div className="flex items-center gap-4">
          <span>⚡ System Ready</span>
          <span className="w-1 h-1 rounded-full bg-[#00ff88] live-pulse" />
          <span>📡 Connected</span>
        </div>
        <div>v0.1.0</div>
      </div>
    </div>
  );
}
