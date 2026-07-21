'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    // Clean up previous widget
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create container for TradingView
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';
    
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
    }

    // Create script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Config
    const config = {
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: 'Asia/Jakarta',
      theme: theme,
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: widgetContainer.id || 'tradingview_chart',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      no_referral_id: true,
    };

    // Set widget ID
    if (widgetContainer) {
      widgetContainer.id = 'tradingview_chart';
    }

    // Set script content
    script.textContent = JSON.stringify(config);

    // Append script to container
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, theme, interval]);

  return (
    <div 
      ref={containerRef} 
      className="w-full rounded-xl overflow-hidden bg-[#131722]"
      style={{ height: `${height}px` }}
    />
  );
}
