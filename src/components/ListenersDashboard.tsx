import React, { useState, useEffect } from 'react';
import { Users, Clock, Radio, TrendingUp, Calendar, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ListenerStats {
  totalListeners: number;
  todayListeners: number;
  averageDuration: number;
  completionRate: number;
  totalSessions: number;
  topPrograms: { audio_id: string; count: number }[];
  recentSessions: {
    id: string;
    created_at: string;
    audio_id: string;
    duration_seconds: number;
    completed: boolean;
  }[];
  dailyStats: { date: string; listeners: number }[];
}

// Sydney timezone utility
const getSydneyNow = () =>
  new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Australia/Sydney',
    })
  );

const getSydneyStartOfDay = () => {
  const d = getSydneyNow();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const ListenersDashboard: React.FC = () => {
  const [stats, setStats] = useState<ListenerStats>({
    totalListeners: 0,
    todayListeners: 0,
    averageDuration: 0,
    completionRate: 0,
    totalSessions: 0,
    topPrograms: [],
    recentSessions: [],
    dailyStats: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('today');

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const sydneyNow = getSydneyNow();
      const startToday = getSydneyStartOfDay();

      let rangeStart: string | null = null;

      if (timeRange === 'today') rangeStart = startToday;
      if (timeRange === 'week') rangeStart = new Date(sydneyNow.getTime() - 7 * 86400000).toISOString();
      if (timeRange === 'month') rangeStart = new Date(sydneyNow.getTime() - 30 * 86400000).toISOString();

      // Total listeners
      let totalQuery = supabase.from('listeners').select('user_id');
      if (rangeStart) totalQuery = totalQuery.gte('created_at', rangeStart);

      const { data: totalData } = await totalQuery;
      const totalListeners = new Set(totalData?.map(l => l.user_id)).size;

      // Today
      const { data: todayData } = await supabase
        .from('listeners')
        .select('user_id')
        .gte('created_at', startToday);

      const todayListeners = new Set(todayData?.map(l => l.user_id)).size;

      // Average duration
      let durationQuery = supabase
        .from('listeners')
        .select('duration_seconds')
        .gt('duration_seconds', 0);

      if (rangeStart) durationQuery = durationQuery.gte('created_at', rangeStart);

      const { data: durationData } = await durationQuery;

      const avgDuration =
        durationData?.length
          ? durationData.reduce((sum, l) => sum + l.duration_seconds, 0) / durationData.length
          : 0;

      // Completion rate
      let sessionsQuery = supabase.from('listeners').select('completed');
      if (rangeStart) sessionsQuery = sessionsQuery.gte('created_at', rangeStart);

      const { data: allSessions } = await sessionsQuery;

      const completed = allSessions?.filter(s => s.completed).length || 0;
      const totalSessions = allSessions?.length || 0;
      const completionRate = totalSessions > 0 ? (completed / totalSessions) * 100 : 0;

      // Top programs
      let programQuery = supabase.from('listeners').select('audio_id, user_id');
      if (rangeStart) programQuery = programQuery.gte('created_at', rangeStart);

      const { data: programData } = await programQuery;

      const map = programData?.reduce((acc, curr) => {
        if (!acc[curr.audio_id]) acc[curr.audio_id] = new Set();
        acc[curr.audio_id].add(curr.user_id);
        return acc;
      }, {} as Record<string, Set<string>>) || {};

      const topPrograms = Object.entries(map)
        .map(([audio_id, users]) => ({
          audio_id,
          count: users.size
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Recent sessions
      let recentQuery = supabase
        .from('listeners')
        .select('id, created_at, audio_id, duration_seconds, completed')
        .order('created_at', { ascending: false })
        .limit(10);

      if (rangeStart) recentQuery = recentQuery.gte('created_at', rangeStart);

      const { data: recentData } = await recentQuery;

      // Daily stats (Sydney timezone)
      const { data: dailyData } = await supabase
        .from('listeners')
        .select('created_at, user_id')
        .gte(
          'created_at',
          new Date(sydneyNow.getTime() - 7 * 86400000).toISOString()
        );

      const dailyMap = dailyData?.reduce((acc, curr) => {
        const sydneyDate = new Date(
          new Date(curr.created_at).toLocaleString('en-US', {
            timeZone: 'Australia/Sydney',
          })
        );
        const key = sydneyDate.toISOString().split('T')[0];

        if (!acc[key]) acc[key] = new Set();
        acc[key].add(curr.user_id);
        return acc;
      }, {} as Record<string, Set<string>>) || {};

      const dailyStats = Object.entries(dailyMap)
        .map(([date, users]) => ({
          date,
          listeners: users.size
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setStats({
        totalListeners,
        todayListeners,
        averageDuration: avgDuration,
        completionRate,
        totalSessions,
        topPrograms,
        recentSessions: recentData || [],
        dailyStats
      });

    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      timeZone: 'Australia/Sydney',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && stats.totalListeners === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Listener Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time statistics in Sydney time (AEDT/AEST)</p>
        </div>

        {/* Time range selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'Last 7 Days' },
            { value: 'month', label: 'Last 30 Days' },
            { value: 'all', label: 'All Time' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeRange === option.value
                  ? 'bg-[#ff6600] text-white'
                  : 'bg-white dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#ff6600]" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalListeners}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Listeners</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Unique users in period</p>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-[#ff6600]" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayListeners}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Listeners</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Active in last 24h</p>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-[#ff6600]" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.averageDuration)}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Session Duration</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Per listening session</p>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-[#ff6600]" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completionRate.toFixed(1)}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Finished listening to programs</p>
          </div>
        </div>

        {/* Top Programs */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Radio className="w-5 h-5 text-[#ff6600]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Most Listened Programs</h2>
          </div>
          <div className="space-y-4">
            {stats.topPrograms.length > 0 ? (
              stats.topPrograms.map((program, index) => (
                <div key={program.audio_id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400 dark:text-gray-600">#{index + 1}</span>
                    <span className="text-gray-900 dark:text-white font-medium">Program {program.audio_id}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{program.count} listeners</span>
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-[#ff6600] h-2 rounded-full"
                        style={{ width: `${(program.count / (stats.topPrograms[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Daily Stats Chart */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-[#ff6600]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Listeners (Last 7 Days)</h2>
          </div>
          <div className="flex items-end gap-2 h-64">
            {stats.dailyStats.map(day => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-[#ff6600] rounded-t-lg transition-all duration-500"
                  style={{ height: `${(day.listeners / Math.max(...stats.dailyStats.map(d => d.listeners), 1)) * 200}px` }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 rotate-45 origin-left whitespace-nowrap">
                  {new Date(day.date).toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney', day: '2-digit', month: 'short' })}
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{day.listeners}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-[#ff6600]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Listening Sessions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Time (Sydney)</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Program</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Duration</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSessions.length > 0 ? (
                  stats.recentSessions.map(session => (
                    <tr key={session.id} className="border-b border-gray-100 dark:border-gray-800/50">
                      <td className="py-3 text-sm text-gray-900 dark:text-white">{formatDate(session.created_at)}</td>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Program {session.audio_id}</td>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{formatDuration(session.duration_seconds)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.completed 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {session.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-400">
                      No listening sessions recorded
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListenersDashboard;