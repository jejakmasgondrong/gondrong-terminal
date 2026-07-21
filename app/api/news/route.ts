import { NextResponse } from 'next/server';

// Mock news data - In production, fetch from real APIs
const mockNews = [
  {
    id: '1',
    title: 'Solana Surpasses 100M Active Addresses as Ecosystem Grows',
    source: 'CoinDesk',
    category: 'Crypto',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
    summary: 'Solana network hits new milestone with 100M active addresses, driven by DeFi and NFT activity.',
  },
  {
    id: '2',
    title: 'Gold Tokenization on Solana: XAUm Launches with Institutional Backing',
    source: 'The Block',
    category: 'DeFi',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1612832105270-2e58fe1ca58a?w=100&h=100&fit=crop',
    summary: 'Matrixdock launches XAUm token on Solana, bringing institutional gold to DeFi.',
  },
  {
    id: '3',
    title: 'Jupiter DEX Hits $10B Monthly Volume, Leading Solana DeFi',
    source: 'DeFi Pulse',
    category: 'DeFi',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop',
    summary: 'Jupiter DEX reaches new milestone, processing over $10B in monthly trading volume.',
  },
  {
    id: '4',
    title: 'SEC Approves First Solana ETF Applications',
    source: 'Cointelegraph',
    category: 'Regulation',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1616077168070-c2e9b48b6554?w=100&h=100&fit=crop',
    summary: 'SEC approves multiple Solana ETF applications, opening doors for institutional investors.',
  },
  {
    id: '5',
    title: 'Bonk Token Surges 200% Following Major Exchange Listings',
    source: 'CryptoSlate',
    category: 'Crypto',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
    summary: 'Bonk token sees massive price surge after being listed on several major exchanges.',
  },
  {
    id: '6',
    title: 'Solana DeFi TVL Reaches $8B, Climbing Back to ATH Levels',
    source: 'DefiLlama',
    category: 'DeFi',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
    summary: 'Total Value Locked on Solana DeFi protocols reaches $8B, approaching previous all-time highs.',
  },
  {
    id: '7',
    title: 'New Stablecoin Regulation Framework Proposed in US',
    source: 'CoinDesk',
    category: 'Regulation',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1616077168070-c2e9b48b6554?w=100&h=100&fit=crop',
    summary: 'US lawmakers propose new regulatory framework for stablecoins, aiming for clarity.',
  },
  {
    id: '8',
    title: 'Solana Mobile Chapter 2 Pre-Orders Surpass Expectations',
    source: 'The Block',
    category: 'Blockchain',
    timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    url: '#',
    image: 'https://images.unsplash.com/photo-1612832105270-2e58fe1ca58a?w=100&h=100&fit=crop',
    summary: 'Solana Mobile Chapter 2 pre-orders exceed 200,000 units, showing strong demand.',
  },
];

const categories = ['All', 'Crypto', 'DeFi', 'Blockchain', 'Regulation'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = mockNews;
  if (category !== 'All') {
    filtered = mockNews.filter((n) => n.category === category);
  }

  // Sort by timestamp (newest first)
  filtered = filtered.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Add delay to simulate API
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    news: filtered.slice(0, limit),
    total: filtered.length,
    categories,
  });
}
