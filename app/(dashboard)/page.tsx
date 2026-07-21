'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome to Gondrong Terminal</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Live</p>
          <p className="text-xl font-mono text-[#00ff88]">{time || 'Loading...'}</p>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Market Cap', value: '$2.45T', change: '+2.3%' },
          { label: '24h Volume', value: '$68.2B', change: '+5.1%' },
          { label: 'BTC Dominance', value: '54.3%', change: '-0.2%' },
          { label: 'Active Pairs', value: '12', change: '' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#14141e] border border-[#2a2a3a] rounded-xl p-6 hover:border-[#00ff88]/20 transition-all"
          >
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            {stat.change && (
              <p
                className={`text-sm mt-1 ${
                  stat.change.startsWith('+')
                    ? 'text-[#00ff88]'
                    : 'text-[#ff6b6b]'
                }`}
              >
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-[#14141e] border border-[#2a2a3a] rounded-xl p-12 text-center">
        <h2 className="text-xl font-semibold text-white">🚀 Features Coming Soon</h2>
        <p className="text-gray-400 mt-2">
          Chart • Watchlist • News • Calendar • AI Analysis • Calculator • Wallet
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {['📊', '👀', '📰', '📅', '🤖', '🧮', '🔗'].map((emoji, i) => (
            <span key={i} className="text-2xl animate-pulse">{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
