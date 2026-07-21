'use client';

import { useEffect, useRef, useState } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'dark' | 'light';
  interval?: string;
  height?: number;
}

export function TradingViewChart({
  symbol = 'BINANCE:SOLUSDT',
  theme = 'dark',
  interval = '15',
  height = 500,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    // Clean up previous widget
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';
    widgetContainer.id = 'tradingview_chart_container';

    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
    }

    // Create script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Format symbol with exchange
    let formattedSymbol = symbol;
    if (!symbol.includes(':')) {
      formattedSymbol = `BINANCE:${symbol}`;
    }

    // Config
    const config = {
      autosize: true,
      symbol: formattedSymbol,
      interval: interval,
      timezone: 'Asia/Jakarta',
      theme: theme,
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_chart_container',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      no_referral_id: true,
      // Add these to fix iframe issues
      loading_screen: {
        backgroundColor: '#131722',
        foregroundColor: '#00ff88',
      },
    };

    // Set script content with proper JSON
    script.textContent = JSON.stringify(config);

    // Handle script load
    script.onload = () => {
      if (mounted) {
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      if (mounted) {
        setError('Failed to load TradingView chart');
        setIsLoading(false);
      }
    };

    // Append script
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (mounted && isLoading) {
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, theme, interval, isLoading]);

  // Valid symbol list for autocomplete
  const validSymbols = [
    'BINANCE:SOLUSDT',
    'BINANCE:BTCUSDT',
    'BINANCE:ETHUSDT',
    'BINANCE:BONKUSDT',
    'BINANCE:JUPUSDT',
    'RAYDIUM:XAUUSDC',
    'BINANCE:DOGEUSDT',
    'BINANCE:ADAUSDT',
  ];

  // Extract display name
  const displaySymbol = symbol.includes(':') ? symbol.split(':')[1] : symbol;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131722] rounded-xl z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/40 text-sm mt-3 font-mono">Loading chart...</p>
            <p className="text-white/20 text-xs mt-1 font-mono">{displaySymbol}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131722] rounded-xl z-10">
          <div className="text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-white/30 text-xs mt-1 font-mono">{displaySymbol}</p>
          </div>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-xl overflow-hidden bg-[#131722]"
      />
    </div>
  );
}
