'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      icon: <DollarSign className="w-5 h-5" />,
    },
    { 
      label: '24h Volume', 
      value: '$68.2B', 
      change: '+5.1%', 
      up: true,
      icon: <Activity className="w-5 h-5" />,
    },
    { 
      label: 'BTC Dominance', 
      value: '54.3%', 
      change: '-0.2%', 
      up: false,
      icon: <Bitcoin className="w-5 h-5" />,
    },
    { 
      label: 'Active Pairs', 
      value: '12', 
      change: '+3', 
      up: true,
      icon: <Zap className="w-5 h-5" />,
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
      {/* Header with 3D Text */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-3d-gradient text-float-glow"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-white/40 text-sm font-mono mt-1 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-premium">Welcome back, Trader</span>
            <span className="text-[#00ff88]">🐍</span>
          </motion.p>
        </div>
        <motion.div 
          className="glass-3d px-6 py-3 rounded-xl text-right min-w-[140px]"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[10px] text-white/30 font-mono tracking-widest">LIVE</p>
          <p className="text-2xl font-mono font-bold text-[#00ff88] neon-pulse">
            {time || '--:--:--'}
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Grid with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-3d glass-3d-hover rounded-2xl p-6 border border-white/5 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#a855f7] to-[#00ff88] opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className={`text-sm font-mono px-2 py-1 rounded-lg flex items-center gap-1 ${
                  stat.up ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-[#ff6b6b] bg-[#ff6b6b]/10'
                }`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-white/60 text-xs font-mono">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features Grid with 3D Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-3d rounded-2xl p-8 border border-white/5"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3d-glow">🚀 Features</span>
          <span className="text-white/20 text-sm font-mono text-premium">(coming soon)</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="glass-3d glass-3d-hover rounded-xl p-4 text-center border border-white/5 hover:border-[#a855f7]/20 transition-all duration-300"
            >
              <div className="text-4xl mb-2 animate-float">{feature.emoji}</div>
              <p className="text-sm font-semibold text-white">{feature.label}</p>
              <p className="text-[10px] text-white/30 font-mono mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Status Bar */}
      <motion.div 
        className="flex items-center justify-between text-[10px] text-white/20 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <span>⚡ System Ready</span>
          <span>●</span>
          <span>📡 Connected</span>
          <span>●</span>
          <span>🧠 AI Engine: Idle</span>
        </div>
        <div className="text-premium">
          <span>v0.1.0 · Portfolio Project</span>
        </div>
      </motion.div>
    </div>
  );
}
