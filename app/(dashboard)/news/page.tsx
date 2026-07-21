'use client';

import { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Clock, 
  Filter,
  ExternalLink,
  RefreshCw,
  Loader2,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: string;
  url: string;
  image: string;
  summary: string;
}

const categoryColors: Record<string, string> = {
  Crypto: 'bg-[#00ff88]/20 text-[#00ff88]',
  DeFi: 'bg-[#a855f7]/20 text-[#a855f7]',
  Blockchain: 'bg-[#6366f1]/20 text-[#6366f1]',
  Regulation: 'bg-[#f59e0b]/20 text-[#f59e0b]',
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = async (category: string = selectedCategory) => {
    try {
      const res = await fetch(`/api/news?category=${category}`);
      const data = await res.json();
      setNews(data.news);
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews('All');
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);
    fetchNews(category);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNews(selectedCategory);
  };

  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">News</h1>
          <p className="text-white/30 text-sm mt-0.5">Crypto news aggregator</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-[#a855f7] animate-spin mx-auto" />
            <p className="text-white/30 text-sm mt-3">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">News</h1>
          <p className="text-white/30 text-sm mt-0.5">Crypto news aggregator</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="glass hover-lift rounded-lg px-4 py-2 border border-white/5 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-white/40 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm text-white/60">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition-all
              ${selectedCategory === cat 
                ? 'glass border border-[#a855f7]/30 text-white' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {news.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-white/40 text-sm">No news found for this category</p>
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="glass hover-lift rounded-xl p-5 border border-white/5 hover:border-[#a855f7]/20 transition-all group"
            >
              <div className="flex gap-4">
                {item.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-white leading-relaxed line-clamp-2">
                      {item.title}
                    </h3>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/20 hover:text-[#a855f7] transition-all flex-shrink-0 mt-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-xs text-white/40 mt-1.5 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${categoryColors[item.category] || 'bg-white/10 text-white/60'}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono">
                      {item.source}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(item.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Total Articles</p>
          <p className="text-lg font-bold text-white">{news.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Categories</p>
          <p className="text-lg font-bold text-white">{categories.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Filter</p>
          <p className="text-sm font-semibold text-white">{selectedCategory}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Status</p>
          <p className="text-sm font-semibold text-[#00ff88] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-pulse" />
            Live
          </p>
        </div>
      </div>
    </div>
  );
}
