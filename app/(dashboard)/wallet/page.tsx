'use client';

import { useState, useEffect } from 'react';
import { 
  Wallet,
  Copy,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  icon: string;
}

const mockTokens: Token[] = [
  { symbol: 'SOL', name: 'Solana', balance: 12.5, value: 1818.75, change24h: 2.34, icon: '🟣' },
  { symbol: 'USDC', name: 'USD Coin', balance: 2500.00, value: 2500.00, change24h: 0.01, icon: '🟢' },
  { symbol: 'BONK', name: 'Bonk', balance: 125000000, value: 3125.00, change24h: -3.21, icon: '🐕' },
  { symbol: 'JUP', name: 'Jupiter', balance: 850.5, value: 1275.75, change24h: 1.45, icon: '🪐' },
];

const mockTransactions = [
  { id: '1', type: 'received', amount: 5.2, token: 'SOL', value: 754.00, timestamp: '2 hours ago' },
  { id: '2', type: 'sent', amount: 100, token: 'USDC', value: 100.00, timestamp: '5 hours ago' },
  { id: '3', type: 'received', amount: 25000000, token: 'BONK', value: 625.00, timestamp: '1 day ago' },
  { id: '4', type: 'swap', amount: 0.5, token: 'SOL', value: 72.50, timestamp: '2 days ago' },
];

export default function WalletPage() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [balance, setBalance] = useState(42.75);
  const [balanceUsd, setBalanceUsd] = useState(6218.50);
  const [tokens] = useState<Token[]>(mockTokens);
  const [transactions] = useState(mockTransactions);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      setConnected(true);
      setAddress('G3t...uKp8');
      setIsLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setAddress('');
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatBalance = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)}K`;
    if (value >= 1) return value.toFixed(2);
    return value.toFixed(6);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight flex items-center gap-2">
            <WalletIcon className="w-7 h-7 text-[#a855f7]" />
            Wallet
          </h1>
          <p className="text-white/30 text-sm mt-0.5">Solana wallet connection</p>
        </div>
        <div className="flex items-center gap-3">
          {connected && (
            <button
              onClick={handleDisconnect}
              className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 text-sm text-white/60 hover:text-red-400 transition-all"
            >
              Disconnect
            </button>
          )}
          <button
            onClick={handleConnect}
            disabled={isLoading || connected}
            className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#00ff88]" />
                <span className="text-sm text-white/80">Connecting...</span>
              </>
            ) : connected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                <span className="text-sm text-[#00ff88]">Connected</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 text-[#a855f7]" />
                <span className="text-sm text-white/80">Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      </div>

      {connected ? (
        <>
          {/* Wallet Info */}
          <div className="glass rounded-xl p-6 border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-white/30 font-mono">Wallet Address</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="font-mono text-sm text-white">{address}</p>
                  <button
                    onClick={handleCopy}
                    className="text-white/30 hover:text-white/60 transition-all"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button className="text-white/30 hover:text-white/60 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-white/30 font-mono">Total Balance</p>
                  <p className="text-2xl font-bold text-white">{formatBalance(balance)} SOL</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30 font-mono">Value</p>
                  <p className="text-xl font-bold text-[#00ff88]">${formatCurrency(balanceUsd)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Token Holdings */}
          <div className="glass rounded-xl p-6 border border-white/5">
            <h2 className="text-sm font-semibold text-white/60 mb-4">Token Holdings</h2>
            <div className="space-y-3">
              {tokens.map((token, index) => {
                const isPositive = token.change24h >= 0;
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{token.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{token.symbol}</p>
                        <p className="text-xs text-white/30 font-mono">{token.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">
                          {token.balance >= 1000 ? formatBalance(token.balance) : token.balance.toFixed(2)}
                        </p>
                        <p className="text-xs text-white/30">${formatCurrency(token.value)}</p>
                      </div>
                      <span className={`text-sm font-mono px-2 py-0.5 rounded ${
                        isPositive ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-red-400 bg-red-500/10'
                      }`}>
                        {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="glass rounded-xl p-6 border border-white/5">
            <h2 className="text-sm font-semibold text-white/60 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      tx.type === 'received' ? 'bg-[#00ff88]/10' :
                      tx.type === 'sent' ? 'bg-red-500/10' :
                      'bg-yellow-500/10'
                    }`}>
                      {tx.type === 'received' ? (
                        <ArrowDownRight className="w-4 h-4 text-[#00ff88]" />
                      ) : tx.type === 'sent' ? (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      ) : (
                        <Zap className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                      <p className="text-xs text-white/30 font-mono">{tx.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      tx.type === 'received' ? 'text-[#00ff88]' :
                      tx.type === 'sent' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.token}
                    </p>
                    <p className="text-xs text-white/30">${formatCurrency(tx.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Disconnected State */
        <div className="glass rounded-xl p-12 border border-white/5 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-[#00ff88]/20 flex items-center justify-center mb-4">
              <Wallet className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white">Connect Your Wallet</h3>
            <p className="text-white/30 text-sm mt-2 max-w-md">
              Connect your Solana wallet to view balances, tokens, and transaction history
            </p>
            <button
              onClick={handleConnect}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-[#00ff88] to-[#a855f7] rounded-lg text-white font-medium hover:opacity-90 transition-all"
            >
              Connect Wallet
            </button>
            <div className="flex items-center gap-4 mt-6 text-xs text-white/20 font-mono">
              <span>Phantom</span>
              <span>•</span>
              <span>Solflare</span>
              <span>•</span>
              <span>Backpack</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Network</p>
          <p className="text-sm font-semibold text-white">Solana Mainnet</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Tokens</p>
          <p className="text-sm font-semibold text-white">{tokens.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Transactions</p>
          <p className="text-sm font-semibold text-white">{transactions.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Status</p>
          <p className={`text-sm font-semibold flex items-center gap-2 ${connected ? 'text-[#00ff88]' : 'text-yellow-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[#00ff88] live-pulse' : 'bg-yellow-400'}`} />
            {connected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>
    </div>
  );
}
