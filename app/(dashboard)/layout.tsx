'use client';

import { ReactNode } from 'react';
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
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
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

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14141e] border-r border-[#2a2a3a] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#2a2a3a]">
          <h1 className="text-2xl font-bold text-[#00ff88]">GONDRONG</h1>
          <p className="text-xs text-gray-400 mt-1">Terminal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e]'
                  }
                `}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2a3a]">
          <p className="text-xs text-gray-500">v0.1.0 • Portfolio Project</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0f0f1a]">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
