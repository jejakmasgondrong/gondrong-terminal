'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  Filter,
  RefreshCw,
  Loader2,
  AlertTriangle,
  AlertCircle,
  Info,
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
  country: string;
  forecast: string;
  previous: string;
  description: string;
}

const impactColors = {
  High: 'border-red-500/30 bg-red-500/10',
  Medium: 'border-yellow-500/30 bg-yellow-500/10',
  Low: 'border-green-500/30 bg-green-500/10',
};

const impactBadges = {
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const impactIcons = {
  High: <AlertTriangle className="w-4 h-4" />,
  Medium: <AlertCircle className="w-4 h-4" />,
  Low: <Info className="w-4 h-4" />,
};

const countryFlags: Record<string, string> = {
  US: '🇺🇸',
  EU: '🇪🇺',
  UK: '🇬🇧',
  JP: '🇯🇵',
  CN: '🇨🇳',
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [impacts, setImpacts] = useState<string[]>([]);
  const [selectedImpact, setSelectedImpact] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  const fetchEvents = async (impact: string = selectedImpact) => {
    try {
      const res = await fetch(`/api/calendar?impact=${impact}`);
      const data = await res.json();
      setEvents(data.events);
      setImpacts(data.impacts);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents('All');
  }, []);

  // Update countdowns every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns: Record<string, string> = {};
      events.forEach((event) => {
        const diff = new Date(event.date).getTime() - Date.now();
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          
          if (days > 0) {
            newCountdowns[event.id] = `${days}d ${hours}h`;
          } else if (hours > 0) {
            newCountdowns[event.id] = `${hours}h ${minutes}m`;
          } else {
            newCountdowns[event.id] = `${minutes}m`;
          }
        } else {
          newCountdowns[event.id] = 'Now';
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const handleImpactChange = (impact: string) => {
    setSelectedImpact(impact);
    setIsLoading(true);
    fetchEvents(impact);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchEvents(selectedImpact);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Economic Calendar</h1>
          <p className="text-white/30 text-sm mt-0.5">Global economic events tracker</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-[#a855f7] animate-spin mx-auto" />
            <p className="text-white/30 text-sm mt-3">Loading calendar...</p>
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
          <h1 className="text-3xl font-bold gradient-text tracking-tight">Economic Calendar</h1>
          <p className="text-white/30 text-sm mt-0.5">Global economic events tracker</p>
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

      {/* Impact Filter */}
      <div className="flex flex-wrap gap-2">
        {impacts.map((impact) => (
          <button
            key={impact}
            onClick={() => handleImpactChange(impact)}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition-all
              ${selectedImpact === impact 
                ? 'glass border border-[#a855f7]/30 text-white' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }
            `}
          >
            {impact}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-12 glass rounded-xl border border-white/5">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-white/40 text-sm">No events found for this filter</p>
          </div>
        ) : (
          events.map((event) => {
            const isNow = countdowns[event.id] === 'Now';
            
            return (
              <div
                key={event.id}
                className={`glass rounded-xl p-5 border transition-all hover:border-[#a855f7]/20 ${impactColors[event.impact]}`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Impact Badge */}
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border ${impactBadges[event.impact]}`}>
                      {impactIcons[event.impact]}
                      {event.impact}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {event.title}
                        </h3>
                        <p className="text-xs text-white/30 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className={`text-sm font-mono font-semibold ${isNow ? 'text-[#00ff88] animate-pulse' : 'text-white'}`}>
                          {isNow ? '🔴 LIVE' : countdowns[event.id] || '--'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                      <span className="text-sm">
                        {countryFlags[event.country] || '🌍'} {event.country}
                      </span>
                      <span className="text-xs text-white/30 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.date)}
                      </span>
                      <span className="text-xs text-white/30 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(event.date)}
                      </span>
                      {event.forecast && (
                        <span className="text-xs text-white/40 font-mono">
                          Forecast: <span className="text-white/60">{event.forecast}</span>
                        </span>
                      )}
                      {event.previous && (
                        <span className="text-xs text-white/30 font-mono">
                          Previous: <span className="text-white/40">{event.previous}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Total Events</p>
          <p className="text-lg font-bold text-white">{events.length}</p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">High Impact</p>
          <p className="text-lg font-bold text-red-400">
            {events.filter(e => e.impact === 'High').length}
          </p>
        </div>
        <div className="glass rounded-lg px-4 py-3 border border-white/5">
          <p className="text-[10px] text-white/30 font-mono">Upcoming</p>
          <p className="text-lg font-bold text-[#00ff88]">
            {events.filter(e => new Date(e.date).getTime() > Date.now()).length}
          </p>
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
