'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Chart', href: '/chart', icon: <LineChart className="w-4 h-4" /> },
  { label: 'Watchlist', href: '/watchlist', icon: <List className="w-4 h-4" /> },
  { label: 'News', href: '/news', icon: <Newspaper className="w-4 h-4" /> },
  { label: 'Calendar', href: '/calendar', icon: <Calendar className="w-4 h-4" /> },
  { label: 'AI Analysis', href: '/ai-analysis', icon: <Bot className="w-4 h-4" /> },
  { label: 'Calculator', href: '/calculator', icon: <Calculator className="w-4 h-4" /> },
  { label: 'Wallet', href: '/wallet', icon: <Wallet className="w-4 h-4" /> },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#05050a]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[240px] flex-col bg-[#0a0a12] border-r border-white/5">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#a855f7] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text tracking-tight">GONDRONG</h1>
              <p className="text-[9px] text-white/20 font-mono tracking-[0.2em]">TERMINAL</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-white/5 text-white border border-white/5' 
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }
                  `}
                >
                  <div className={isActive ? 'text-[#a855f7]' : 'text-inherit'}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5">
          <p className="text-[9px] text-white/10 font-mono text-center">v0.1.0 · Portfolio</p>
        </div>
      </aside>

      {/* Mobile Menu */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0a0a12] border border-white/10"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <aside className="w-[240px] h-full bg-[#0a0a12] border-r border-white/5 p-4">
            <div className="p-2">
              <h1 className="text-xl font-bold gradient-text">GONDRONG</h1>
            </div>
            <nav className="mt-4 space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                      ${isActive ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                    `}>
                      <div className={isActive ? 'text-[#a855f7]' : ''}>{item.icon}</div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-6 pt-16 lg:pt-8 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
