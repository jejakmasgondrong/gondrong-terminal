'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  LineChart,
  List,
  Newspaper,
  Calendar,
  Bot,
  Calculator,
  Wallet,
  Menu,
  X,
  Zap,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  gradient?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" />, gradient: 'from-[#00ff88] to-[#a855f7]' },
  { label: 'Chart', href: '/chart', icon: <LineChart className="w-5 h-5" />, gradient: 'from-[#a855f7] to-[#7c3aed]' },
  { label: 'Watchlist', href: '/watchlist', icon: <List className="w-5 h-5" />, gradient: 'from-[#7c3aed] to-[#6366f1]' },
  { label: 'News', href: '/news', icon: <Newspaper className="w-5 h-5" />, gradient: 'from-[#6366f1] to-[#3b82f6]' },
  { label: 'Calendar', href: '/calendar', icon: <Calendar className="w-5 h-5" />, gradient: 'from-[#3b82f6] to-[#06b6d4]' },
  { label: 'AI Analysis', href: '/ai-analysis', icon: <Bot className="w-5 h-5" />, gradient: 'from-[#06b6d4] to-[#00ff88]' },
  { label: 'Calculator', href: '/calculator', icon: <Calculator className="w-5 h-5" />, gradient: 'from-[#00ff88] to-[#84cc16]' },
  { label: 'Wallet', href: '/wallet', icon: <Wallet className="w-5 h-5" />, gradient: 'from-[#84cc16] to-[#a855f7]' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#05050a]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-col bg-[#0a0a12]/80 backdrop-blur-2xl border-r border-white/5">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#a855f7] flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">GONDRONG</h1>
              <p className="text-[10px] text-white/30 font-mono tracking-widest">TERMINAL</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'glass border border-[#a855f7]/30' 
                      : 'hover:glass border border-transparent'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a855f7]/10 to-[#00ff88]/5 animate-pulse" />
                  )}
                  <div className={`
                    ${isActive ? 'text-[#a855f7]' : 'text-white/40 group-hover:text-white/60'}
                    transition-colors duration-300 relative z-10
                  `}>
                    {item.icon}
                  </div>
                  <span className={`
                    text-sm font-medium relative z-10
                    ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
                    transition-colors duration-300
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-lg shadow-[#a855f7]/50"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/20 font-mono">⚡ v0.1.0 · Portfolio Project</p>
            <p className="text-[8px] text-white/10 mt-1 font-mono">Built with 🐍 by Gondrong</p>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xl">
          <aside className="w-[280px] h-full bg-[#0a0a12] border-r border-white/5 p-4">
            <div className="p-4">
              <h1 className="text-2xl font-bold gradient-text">GONDRONG</h1>
            </div>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive ? 'glass border border-[#a855f7]/30' : 'hover:glass'}
                    `}>
                      <div className={isActive ? 'text-[#a855f7]' : 'text-white/40'}>
                        {item.icon}
                      </div>
                      <span className={`text-sm ${isActive ? 'text-white' : 'text-white/60'}`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto custom-scrollbar bg-[#05050a]">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
