'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  AlertCircle,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';

interface PositionResult {
  positionSize: number;
  riskAmount: number;
  rewardAmount: number;
  riskRewardRatio: number;
  potentialProfit: number;
  potentialLoss: number;
  breakEvenPrice: number;
  leverage: number;
}

export default function CalculatorPage() {
  const [entryPrice, setEntryPrice] = useState<number>(145.50);
  const [stopLoss, setStopLoss] = useState<number>(140.00);
  const [takeProfit, setTakeProfit] = useState<number>(160.00);
  const [capital, setCapital] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [leverage, setLeverage] = useState<number>(1);
  const [selectedPair, setSelectedPair] = useState('SOLUSDT');
  const [result, setResult] = useState<PositionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pairs = [
    { label: 'SOL/USDT', value: 'SOLUSDT' },
    { label: 'BTC/USDT', value: 'BTCUSDT' },
    { label: 'ETH/USDT', value: 'ETHUSDT' },
    { label: 'BONK/USDT', value: 'BONKUSDT' },
    { label: 'XAU/USD', value: 'XAUUSD' },
  ];

  const calculatePosition = () => {
    setError(null);

    if (entryPrice <= 0 || stopLoss <= 0 || takeProfit <= 0 || capital <= 0) {
      setError('All values must be greater than 0');
      return;
    }

    if (stopLoss >= entryPrice) {
      setError('Stop loss must be below entry price (for long positions)');
      return;
    }

    if (takeProfit <= entryPrice) {
      setError('Take profit must be above entry price (for long positions)');
      return;
    }

    if (riskPercent <= 0 || riskPercent > 100) {
      setError('Risk percent must be between 1 and 100');
      return;
    }

    if (leverage < 1 || leverage > 100) {
      setError('Leverage must be between 1 and 100');
      return;
    }

    const riskAmount = capital * (riskPercent / 100);
    const priceDiff = entryPrice - stopLoss;
    const positionSize = riskAmount / priceDiff;
    const leveragedPositionSize = positionSize * leverage;
    const requiredMargin = positionSize * entryPrice;
    const leveragedRequiredMargin = requiredMargin / leverage;
    const rewardDiff = takeProfit - entryPrice;
    const rewardAmount = positionSize * rewardDiff;
    const riskRewardRatio = rewardAmount / riskAmount;
    const potentialProfit = positionSize * rewardDiff * leverage;
    const potentialLoss = positionSize * priceDiff * leverage;
    const breakEvenPrice = entryPrice + (priceDiff / 2);

    setResult({
      positionSize,
      riskAmount,
      rewardAmount,
      riskRewardRatio,
      potentialProfit,
      potentialLoss,
      breakEvenPrice,
      leverage,
    });
  };

  useEffect(() => {
    calculatePosition();
  }, []);

  const formatCurrency = (value: number) => {
    if (value < 0.01 && value > 0) return value.toFixed(6);
    if (value < 1) return value.toFixed(4);
    if (value < 100) return value.toFixed(2);
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const isProfitPositive = result?.potentialProfit ? result.potentialProfit > 0 : false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text tracking-tight">Position Calculator</h1>
        <p className="text-white/30 text-sm mt-0.5">Risk management & position sizing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h2 className="text-base font-semibold text-white mb-4">Position Parameters</h2>

          <div className="space-y-4">
            {/* Pair Select - Custom styled */}
            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Pair</label>
              <div className="relative">
                <select 
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 appearance-none cursor-pointer hover:bg-white/10 transition-all"
                >
                  {pairs.map((pair) => (
                    <option key={pair.value} value={pair.value} className="bg-[#0a0a12] text-white py-2">
                      {pair.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            {/* Input fields dengan styling custom */}
            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Entry Price ($)</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                step="0.01"
                min="0"
                placeholder="Enter entry price..."
              />
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Stop Loss ($)</label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                step="0.01"
                min="0"
                placeholder="Enter stop loss..."
              />
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Take Profit ($)</label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                step="0.01"
                min="0"
                placeholder="Enter take profit..."
              />
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Capital ($)</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                step="100"
                min="0"
                placeholder="Enter capital..."
              />
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Risk per Trade (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                  step="0.5"
                  min="0.5"
                  max="10"
                  placeholder="Enter risk %..."
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Leverage (1x - 100x)</label>
              <input
                type="number"
                value={leverage}
                onChange={(e) => setLeverage(parseFloat(e.target.value) || 1)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#a855f7]/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                step="1"
                min="1"
                max="100"
                placeholder="Enter leverage..."
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={calculatePosition}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#00ff88] to-[#a855f7] rounded-lg text-white font-medium hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Calculate Position
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#a855f7]" />
            Results
          </h2>

          {result ? (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <p className="text-[10px] text-white/30 font-mono">Position Size</p>
                <p className="text-xl font-bold text-white">{formatCurrency(result.positionSize)} units</p>
                <p className="text-xs text-white/20 font-mono mt-0.5">Leveraged: {result.leverage}x</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/10">
                  <p className="text-[10px] text-red-400/60 font-mono">Risk Amount</p>
                  <p className="text-lg font-bold text-red-400">
                    ${formatCurrency(result.riskAmount)}
                  </p>
                </div>
                <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                  <p className="text-[10px] text-green-400/60 font-mono">Reward Amount</p>
                  <p className="text-lg font-bold text-green-400">
                    ${formatCurrency(result.rewardAmount)}
                  </p>
                </div>
              </div>

              <div className="bg-[#a855f7]/5 rounded-lg p-4 border border-[#a855f7]/10">
                <p className="text-[10px] text-[#a855f7]/60 font-mono">Risk/Reward Ratio</p>
                <p className="text-lg font-bold text-[#a855f7]">
                  1:{result.riskRewardRatio.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`${isProfitPositive ? 'bg-green-500/5' : 'bg-red-500/5'} rounded-lg p-4 border ${isProfitPositive ? 'border-green-500/10' : 'border-red-500/10'}`}>
                  <p className="text-[10px] text-white/30 font-mono">Potential Profit</p>
                  <p className={`text-lg font-bold ${isProfitPositive ? 'text-green-400' : 'text-white/40'}`}>
                    ${formatCurrency(result.potentialProfit)}
                  </p>
                </div>
                <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/10">
                  <p className="text-[10px] text-white/30 font-mono">Potential Loss</p>
                  <p className="text-lg font-bold text-red-400">
                    -${formatCurrency(Math.abs(result.potentialLoss))}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <p className="text-[10px] text-white/30 font-mono">Break-even Price</p>
                <p className="text-sm font-semibold text-white">
                  ${formatCurrency(result.breakEvenPrice)}
                </p>
              </div>

              {result.leverage > 1 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-yellow-400 font-medium">Leverage Warning</p>
                    <p className="text-[10px] text-yellow-400/60 mt-0.5">
                      Using leverage ({result.leverage}x) amplifies both profits and losses
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Calculator className="w-12 h-12 text-white/10 mx-auto" />
                <p className="text-white/20 text-sm mt-3">Fill in parameters and calculate</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Current Pair</p>
          <p className="text-sm font-semibold text-white">
            {pairs.find(p => p.value === selectedPair)?.label || selectedPair}
          </p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Risk per Trade</p>
          <p className="text-sm font-semibold text-white">{riskPercent}%</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Leverage</p>
          <p className="text-sm font-semibold text-white">{leverage}x</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Status</p>
          <p className="text-sm font-semibold text-[#00ff88] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-pulse" />
            Ready
          </p>
        </div>
      </div>
    </div>
  );
}
