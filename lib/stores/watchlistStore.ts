import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchlistItem {
  id: string;
  symbol: string;
  label: string;
  price: number;
  change24h: number;
  volume: string;
  exchange: string;
}

interface WatchlistStore {
  items: WatchlistItem[];
  addItem: (item: Omit<WatchlistItem, 'id' | 'price' | 'change24h' | 'volume'>) => void;
  removeItem: (id: string) => void;
  updatePrice: (id: string, price: number, change24h: number, volume: string) => void;
  reorder: (startIndex: number, endIndex: number) => void;
}

// Mock price generator
const generatePrice = (basePrice: number) => {
  const volatility = 0.02; // 2% volatility
  const change = (Math.random() - 0.5) * volatility * 2;
  return {
    price: basePrice * (1 + change),
    change24h: (Math.random() - 0.45) * 0.1, // -5% to +5%
    volume: `${Math.floor(Math.random() * 10000 + 1000).toLocaleString()}`
  };
};

// Initial default pairs
const defaultPairs = [
  { symbol: 'BINANCE:SOLUSDT', label: 'SOL/USDT', exchange: 'Binance', basePrice: 145.50 },
  { symbol: 'BINANCE:BTCUSDT', label: 'BTC/USDT', exchange: 'Binance', basePrice: 65420.00 },
  { symbol: 'BINANCE:ETHUSDT', label: 'ETH/USDT', exchange: 'Binance', basePrice: 3450.00 },
  { symbol: 'BINANCE:BONKUSDT', label: 'BONK/USDT', exchange: 'Binance', basePrice: 0.0000245 },
  { symbol: 'RAYDIUM:XAUUSDC', label: 'XAU/USDC', exchange: 'Raydium', basePrice: 2450.00 },
];

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      items: defaultPairs.map((p) => ({
        id: p.symbol,
        symbol: p.symbol,
        label: p.label,
        exchange: p.exchange,
        ...generatePrice(p.basePrice),
      })),
      
      addItem: (item) => {
        set((state) => {
          // Check if already exists
          if (state.items.some((i) => i.symbol === item.symbol)) {
            return state;
          }
          
          const basePrice = item.symbol.includes('XAU') ? 2450 : 100;
          const newItem: WatchlistItem = {
            id: item.symbol,
            symbol: item.symbol,
            label: item.label,
            exchange: item.exchange || 'Custom',
            ...generatePrice(basePrice),
          };
          
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updatePrice: (id, price, change24h, volume) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, price, change24h, volume }
              : item
          ),
        }));
      },
      
      reorder: (startIndex, endIndex) => {
        set((state) => {
          const newItems = [...state.items];
          const [removed] = newItems.splice(startIndex, 1);
          newItems.splice(endIndex, 0, removed);
          return { items: newItems };
        });
      },
    }),
    {
      name: 'gondrong-watchlist',
    }
  )
);
