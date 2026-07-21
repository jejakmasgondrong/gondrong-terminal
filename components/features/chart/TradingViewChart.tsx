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
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Clean up previous script
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Create config with proper escaping for embedded widget
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
    };

    // Set the script innerHTML with the widget config
    script.innerHTML = JSON.stringify(config);

    // Append script to container
    if (containerRef.current) {
      // Create a wrapper div for the widget
      const widgetWrapper = document.createElement('div');
      widgetWrapper.className = 'tradingview-widget-container';
      widgetWrapper.id = 'tradingview_chart_container';
      widgetWrapper.style.height = '100%';
      widgetWrapper.style.width = '100%';
      
      containerRef.current.appendChild(widgetWrapper);
      widgetWrapper.appendChild(script);
      scriptRef.current = script;
    }

    // Cleanup on unmount
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
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
