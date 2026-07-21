'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
  const label = 'wallet'
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="p-2 rounded-lg bg-[#14141e] border border-[#2a2a3a] hover:border-[#00ff88]/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white"></h1>
          <p className="text-gray-400 mt-1">Coming soon...</p>
        </div>
      </div>

      <div className="bg-[#14141e] border border-[#2a2a3a] rounded-xl p-12 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold text-white">Under Construction</h2>
        <p className="text-gray-400 mt-2">
          This feature is being built. Check back soon!
        </p>
      </div>
    </div>
  );
}
