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
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Chart', href: '/chart', icon: <LineChart className="w-5 h-5" /> },
  { label: 'Watchlist', href: '/watchlist', icon: <List className="w-5 h-5" /> },
  { label: 'News', href: '/news', icon: <Newspaper className="w-5 h-5" /> },
  { label: 'Calendar', href: '/calendar', icon: <Calendar className="w-5 h-5" /> },
  { label: 'AI Analysis', href: '/ai-analysis', icon: <Bot className="w-5 h-5" /> },
  { label: 'Calculator', href: '/calculator', icon: <Calculator className="w-5 h-5" /> },
  { label: 'Wallet', href: '/wallet', icon: <Wallet className="w-5 h-5" /> },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#05050a]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-col bg-[#0a0a12]/80 backdrop-blur-2xl border-r border-white/5">
        {/* Logo with 3D Effect */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#a855f7]/20"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold text-3d-gradient text-float-glow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                GONDRONG
              </motion.h1>
              <p className="text-[10px] text-white/20 font-mono tracking-[0.3em] text-premium">
                TERMINAL
              </p>
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
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'glass-3d glass-3d-hover border border-[#a855f7]/20' 
                      : 'hover:glass-3d border border-transparent'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a855f7]/10 to-[#00ff88]/5"
                    />
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
                      layoutId="activeDot"
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
          <div className="glass-3d rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/20 font-mono">⚡ v0.1.0 · Portfolio Project</p>
            <p className="text-[8px] text-white/10 mt-1 font-mono">Built with 🐍 by Gondrong</p>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass-3d"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xl">
          <aside className="w-[280px] h-full bg-[#0a0a12] border-r border-white/5 p-4">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-3d-gradient">GONDRONG</h1>
            </div>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive ? 'glass-3d border border-[#a855f7]/20' : 'hover:glass-3d'}
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
