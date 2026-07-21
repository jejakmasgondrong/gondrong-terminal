import { NextResponse } from 'next/server';

// Mock economic calendar data
const mockEvents = [
  {
    id: '1',
    title: 'FOMC Meeting Minutes',
    date: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours from now
    impact: 'High',
    country: 'US',
    forecast: '-',
    previous: '-',
    description: 'Federal Open Market Committee meeting minutes release.',
  },
  {
    id: '2',
    title: 'US CPI Data Release',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day from now
    impact: 'High',
    country: 'US',
    forecast: '3.2%',
    previous: '3.4%',
    description: 'Consumer Price Index - key inflation indicator.',
  },
  {
    id: '3',
    title: 'ECB Interest Rate Decision',
    date: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days from now
    impact: 'High',
    country: 'EU',
    forecast: '4.25%',
    previous: '4.50%',
    description: 'European Central Bank interest rate decision.',
  },
  {
    id: '4',
    title: 'US Non-Farm Payrolls',
    date: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(), // 3 days from now
    impact: 'High',
    country: 'US',
    forecast: '250K',
    previous: '275K',
    description: 'Monthly employment report - key economic indicator.',
  },
  {
    id: '5',
    title: 'BOJ Monetary Policy Statement',
    date: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString(), // 4 days from now
    impact: 'Medium',
    country: 'JP',
    forecast: '-',
    previous: '-',
    description: 'Bank of Japan monetary policy announcement.',
  },
  {
    id: '6',
    title: 'UK Retail Sales',
    date: new Date(Date.now() + 1000 * 60 * 60 * 120).toISOString(), // 5 days from now
    impact: 'Medium',
    country: 'UK',
    forecast: '0.5%',
    previous: '0.3%',
    description: 'UK retail sales growth indicator.',
  },
  {
    id: '7',
    title: 'China GDP Growth Rate',
    date: new Date(Date.now() + 1000 * 60 * 60 * 144).toISOString(), // 6 days from now
    impact: 'High',
    country: 'CN',
    forecast: '5.1%',
    previous: '4.9%',
    description: 'Chinese GDP growth rate quarterly data.',
  },
  {
    id: '8',
    title: 'US PPI Data Release',
    date: new Date(Date.now() + 1000 * 60 * 60 * 168).toISOString(), // 7 days from now
    impact: 'Medium',
    country: 'US',
    forecast: '2.1%',
    previous: '1.9%',
    description: 'Producer Price Index - wholesale inflation data.',
  },
  {
    id: '9',
    title: 'Fed Chair Speech',
    date: new Date(Date.now() + 1000 * 60 * 60 * 192).toISOString(), // 8 days from now
    impact: 'High',
    country: 'US',
    forecast: '-',
    previous: '-',
    description: 'Federal Reserve Chair public address on monetary policy.',
  },
  {
    id: '10',
    title: 'German ZEW Economic Sentiment',
    date: new Date(Date.now() + 1000 * 60 * 60 * 216).toISOString(), // 9 days from now
    impact: 'Low',
    country: 'EU',
    forecast: '42.1',
    previous: '41.5',
    description: 'German economic sentiment survey results.',
  },
  {
    id: '11',
    title: 'Japan CPI Data Release',
    date: new Date(Date.now() + 1000 * 60 * 60 * 240).toISOString(), // 10 days from now
    impact: 'Medium',
    country: 'JP',
    forecast: '2.8%',
    previous: '2.6%',
    description: 'Japanese consumer price index data.',
  },
  {
    id: '12',
    title: 'US Retail Sales',
    date: new Date(Date.now() + 1000 * 60 * 60 * 264).toISOString(), // 11 days from now
    impact: 'High',
    country: 'US',
    forecast: '0.4%',
    previous: '0.6%',
    description: 'US retail sales growth data - key consumer spending indicator.',
  },
];

const impactColors = {
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const countryFlags: Record<string, string> = {
  US: '🇺🇸',
  EU: '🇪🇺',
  UK: '🇬🇧',
  JP: '🇯🇵',
  CN: '🇨🇳',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const impact = searchParams.get('impact') || 'All';
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = mockEvents;
  if (impact !== 'All') {
    filtered = mockEvents.filter((e) => e.impact === impact);
  }

  // Sort by date (soonest first)
  filtered = filtered.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Add delay to simulate API
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({
    events: filtered.slice(0, limit),
    total: filtered.length,
    impacts: ['All', 'High', 'Medium', 'Low'],
  });
}
