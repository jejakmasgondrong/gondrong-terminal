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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    let widgetInitialized = false;
    const container = containerRef.current;
    
    // Clean up container
    container.innerHTML = '';

    // Create new container with ID
    const widgetDiv = document.createElement('div');
    widgetDiv.id = `tv_chart_${Date.now()}`;
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '100%';
    container.appendChild(widgetDiv);

    // Format symbol
    const formattedSymbol = symbol.includes(':') ? symbol : `BINANCE:${symbol}`;

    // Widget config
    const widgetConfig = {
      autosize: true,
      symbol: formattedSymbol,
      interval: interval,
      timezone: 'Asia/Jakarta',
      theme: theme,
      style: '1',
      locale: 'en',
      toolbar_bg: '#131722',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: widgetDiv.id,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      no_referral_id: true,
      loading_screen: {
        backgroundColor: '#131722',
        foregroundColor: '#00ff88',
      },
    };

    // Load TradingView script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      try {
        // @ts-ignore - TradingView global
        if (window.TradingView) {
          // @ts-ignore
          new window.TradingView.widget(widgetConfig);
          setIsLoading(false);
          widgetInitialized = true;
        } else {
          // Fallback: try loading with embed widget
          const embedScript = document.createElement('script');
          embedScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
          embedScript.type = 'text/javascript';
          embedScript.async = true;
          embedScript.textContent = JSON.stringify(widgetConfig);
          container.appendChild(embedScript);
          
          embedScript.onload = () => {
            setIsLoading(false);
            widgetInitialized = true;
          };
          
          embedScript.onerror = () => {
            setError('Failed to load chart widget');
            setIsLoading(false);
          };
        }
      } catch (err) {
        setError('Error initializing chart');
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError('Failed to load TradingView script');
      setIsLoading(false);
    };

    container.appendChild(script);

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      widgetInitialized = false;
    };
  }, [symbol, theme, interval, isMounted]);

  // Display symbol name
  const displaySymbol = symbol.includes(':') ? symbol.split(':')[1] : symbol;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131722] rounded-xl z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/40 text-sm mt-3 font-mono">Loading chart...</p>
            <p className="text-white/20 text-xs mt-1 font-mono">{displaySymbol}</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131722] rounded-xl z-10">
          <div className="text-center max-w-sm">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-400 text-sm font-medium">{error}</p>
            <p className="text-white/30 text-xs mt-2 font-mono">
              Symbol: {displaySymbol}
            </p>
            <p className="text-white/20 text-xs mt-1 font-mono">
              Try changing the symbol or refresh
            </p>
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-xl overflow-hidden bg-[#131722]"
      />
    </div>
  );
}
