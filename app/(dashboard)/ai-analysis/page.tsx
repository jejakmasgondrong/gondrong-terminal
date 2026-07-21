'use client';

import { useState, useEffect } from 'react';
import { 
  Bot,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Brain,
  Target,
  Shield,
  Zap,
  RefreshCw,
} from 'lucide-react';

interface AIData {
  symbol: string;
  currentPrice: number;
  prediction: {
    price: number;
    confidence: number;
    direction: 'bullish' | 'bearish' | 'neutral';
  };
  support: number[];
  resistance: number[];
  sentiment: {
    score: number; // -1 to 1
    label: string;
    color: string;
  };
  risk: {
    level: 'Low' | 'Medium' | 'High';
    score: number;
  };
  signals: {
    type: 'buy' | 'sell' | 'hold';
    strength: 'Strong' | 'Moderate' | 'Weak';
    reason: string;
  }[];
  patterns: {
    name: string;
    detected: boolean;
    description: string;
  }[];
  recommendation: {
    action: 'Buy' | 'Sell' | 'Hold';
    confidence: number;
    summary: string;
  };
}

const mockAIData: AIData = {
  symbol: 'SOL/USDT',
  currentPrice: 145.50,
  prediction: {
    price: 158.75,
    confidence: 0.72,
    direction: 'bullish',
  },
  support: [142.30, 138.80, 135.20],
  resistance: [148.90, 152.40, 158.75],
  sentiment: {
    score: 0.65,
    label: 'Bullish',
    color: '#00ff88',
  },
  risk: {
    level: 'Medium',
    score: 0.45,
  },
  signals: [
    { type: 'buy', strength: 'Strong', reason: 'Bullish divergence on RSI' },
    { type: 'buy', strength: 'Moderate', reason: 'Break above 50-day MA' },
    { type: 'sell', strength: 'Weak', reason: 'Overbought conditions' },
  ],
  patterns: [
    { name: 'Bullish Flag', detected: true, description: 'Continuation pattern indicating upward trend' },
    { name: 'Head & Shoulders', detected: false, description: 'Reversal pattern - not detected' },
    { name: 'Double Bottom', detected: false, description: 'Reversal pattern - not detected' },
    { name: 'Trendline Breakout', detected: true, description: 'Price broke above downtrend line' },
  ],
  recommendation: {
    action: 'Buy',
    confidence: 0.78,
    summary: 'Strong bullish momentum with 72% predicted upside. R/R ratio favorable at 2.8:1.',
  },
};

const pairs = ['SOL/USDT', 'BTC/USDT', 'ETH/USDT', 'BONK/USDT', 'XAU/USD'];

export default function AIPage() {
  const [aiData, setAiData] = useState<AIData>(mockAIData);
  const [selectedPair, setSelectedPair] = useState('SOL/USDT');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<string>('Just now');

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setIsLoading(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate slight variation in data
    const variation = (Math.random() - 0.5) * 0.1;
    const newPrediction = mockAIData.prediction.price * (1 + variation * 0.02);
    const newConfidence = Math.min(0.95, Math.max(0.5, mockAIData.prediction.confidence + (Math.random() - 0.5) * 0.1));
    
    setAiData({
      ...mockAIData,
      symbol: selectedPair,
      currentPrice: mockAIData.currentPrice * (1 + variation * 0.01),
      prediction: {
        ...mockAIData.prediction,
        price: newPrediction,
        confidence: newConfidence,
        direction: newConfidence > 0.6 ? 'bullish' : 'neutral',
      },
      sentiment: {
        ...mockAIData.sentiment,
        score: Math.min(0.9, Math.max(-0.9, mockAIData.sentiment.score + (Math.random() - 0.5) * 0.2)),
      },
      risk: {
        ...mockAIData.risk,
        score: Math.min(0.8, Math.max(0.1, mockAIData.risk.score + (Math.random() - 0.5) * 0.1)),
      },
    });
    
    setIsLoading(false);
    setIsAnalyzing(false);
    setLastAnalysis(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const handlePairChange = (pair: string) => {
    setSelectedPair(pair);
    runAnalysis();
  };

  const getSignalIcon = (type: 'buy' | 'sell' | 'hold') => {
    switch(type) {
      case 'buy': return <TrendingUp className="w-4 h-4 text-[#00ff88]" />;
      case 'sell': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'hold': return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getSignalColor = (type: 'buy' | 'sell' | 'hold') => {
    switch(type) {
      case 'buy': return 'border-[#00ff88]/20 bg-[#00ff88]/5';
      case 'sell': return 'border-red-500/20 bg-red-500/5';
      case 'hold': return 'border-yellow-500/20 bg-yellow-500/5';
    }
  };

  const getStrengthColor = (strength: string) => {
    switch(strength) {
      case 'Strong': return 'text-[#00ff88]';
      case 'Moderate': return 'text-yellow-400';
      case 'Weak': return 'text-white/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight flex items-center gap-2">
            <Brain className="w-8 h-8 text-[#a855f7]" />
            AI Analysis
          </h1>
          <p className="text-white/30 text-sm mt-0.5">Machine learning market intelligence</p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-[#00ff88] ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span className="text-sm text-white/80">
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </span>
        </button>
      </div>

      {/* Pair Selector */}
      <div className="flex flex-wrap gap-2">
        {pairs.map((pair) => (
          <button
            key={pair}
            onClick={() => handlePairChange(pair)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedPair === pair 
                ? 'glass border border-[#a855f7]/30 text-white' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }
            `}
          >
            {pair}
          </button>
        ))}
      </div>

      {/* AI Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Price & Prediction */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Price Analysis
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/30 font-mono">Current Price</p>
              <p className="text-2xl font-bold text-white">
                ${aiData.currentPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/30 font-mono">Prediction</p>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${aiData.prediction.direction === 'bullish' ? 'text-[#00ff88]' : aiData.prediction.direction === 'bearish' ? 'text-red-400' : 'text-yellow-400'}`}>
                  ${aiData.prediction.price.toFixed(2)}
                </span>
                <span className={`text-sm font-mono px-2 py-0.5 rounded ${
                  aiData.prediction.direction === 'bullish' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 
                  aiData.prediction.direction === 'bearish' ? 'bg-red-500/10 text-red-400' : 
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {aiData.prediction.direction.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#a855f7] to-[#00ff88] transition-all duration-500"
                  style={{ width: `${aiData.prediction.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/40 font-mono">
                {(aiData.prediction.confidence * 100).toFixed(1)}% confidence
              </span>
            </div>
          </div>
        </div>

        {/* Sentiment & Risk */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Market Sentiment
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-[10px] text-white/30 font-mono">Sentiment Score</p>
              <p className={`text-2xl font-bold ${aiData.sentiment.score > 0 ? 'text-[#00ff88]' : aiData.sentiment.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {aiData.sentiment.score > 0 ? '+' : ''}{(aiData.sentiment.score * 100).toFixed(0)}%
              </p>
              <p className={`text-sm font-mono mt-1 ${aiData.sentiment.score > 0 ? 'text-[#00ff88]' : aiData.sentiment.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {aiData.sentiment.label}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-[10px] text-white/30 font-mono">Risk Level</p>
              <p className={`text-2xl font-bold ${
                aiData.risk.level === 'Low' ? 'text-[#00ff88]' : 
                aiData.risk.level === 'Medium' ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {aiData.risk.level}
              </p>
              <p className="text-sm font-mono text-white/40 mt-1">
                {(aiData.risk.score * 100).toFixed(0)}% risk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signals & Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trading Signals */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Trading Signals
          </h3>
          <div className="space-y-3">
            {aiData.signals.map((signal, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${getSignalColor(signal.type)}`}>
                <div className="flex items-center gap-3">
                  {getSignalIcon(signal.type)}
                  <div>
                    <p className={`text-sm font-medium ${
                      signal.type === 'buy' ? 'text-[#00ff88]' : 
                      signal.type === 'sell' ? 'text-red-400' : 
                      'text-yellow-400'
                    }`}>
                      {signal.type.toUpperCase()}
                    </p>
                    <p className="text-xs text-white/40">{signal.reason}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono ${getStrengthColor(signal.strength)}`}>
                  {signal.strength}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div className="glass rounded-xl p-6 border border-white/5">
          <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pattern Recognition
          </h3>
          <div className="space-y-2">
            {aiData.patterns.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    {pattern.detected ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-white/20" />
                    )}
                    <span className="text-sm text-white">{pattern.name}</span>
                  </div>
                  <p className="text-xs text-white/30 ml-6">{pattern.description}</p>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  pattern.detected ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-white/5 text-white/20'
                }`}>
                  {pattern.detected ? 'Detected' : 'Not detected'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support & Resistance */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Support & Resistance Levels
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/30 font-mono mb-2">Support Levels</p>
            <div className="space-y-1.5">
              {aiData.support.map((level, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="text-sm font-mono text-white">${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-white/30 font-mono mb-2">Resistance Levels</p>
            <div className="space-y-1.5">
              {aiData.resistance.map((level, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  <span className="text-sm font-mono text-white">${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`glass rounded-xl p-6 border ${
        aiData.recommendation.action === 'Buy' ? 'border-[#00ff88]/20 bg-[#00ff88]/5' :
        aiData.recommendation.action === 'Sell' ? 'border-red-500/20 bg-red-500/5' :
        'border-yellow-500/20 bg-yellow-500/5'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            aiData.recommendation.action === 'Buy' ? 'bg-[#00ff88]/10' :
            aiData.recommendation.action === 'Sell' ? 'bg-red-500/10' :
            'bg-yellow-500/10'
          }`}>
            <Brain className={`w-6 h-6 ${
              aiData.recommendation.action === 'Buy' ? 'text-[#00ff88]' :
              aiData.recommendation.action === 'Sell' ? 'text-red-400' :
              'text-yellow-400'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-bold text-white">AI Recommendation</h4>
              <span className={`text-sm font-mono px-3 py-1 rounded-lg ${
                aiData.recommendation.action === 'Buy' ? 'bg-[#00ff88]/10 text-[#00ff88]' :
                aiData.recommendation.action === 'Sell' ? 'bg-red-500/10 text-red-400' :
                'bg-yellow-500/10 text-yellow-400'
              }`}>
                {aiData.recommendation.action}
              </span>
            </div>
            <p className="text-sm text-white/60 mt-2">{aiData.recommendation.summary}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 bg-white/5 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#00ff88]"
                  style={{ width: `${aiData.recommendation.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/40 font-mono">
                {(aiData.recommendation.confidence * 100).toFixed(1)}% confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[10px] text-white/20 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Brain className="w-3 h-3" />
            AI Engine: Active
          </span>
          <span className="w-1 h-1 rounded-full bg-[#00ff88] live-pulse" />
          <span>Last analysis: {lastAnalysis}</span>
        </div>
        <div>
          <span>Powered by TensorFlow.js • v0.1.0</span>
        </div>
      </div>
    </div>
  );
}
