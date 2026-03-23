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

// 🔥 NOVO: util Sydney
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

      // Hoje
      const { data: todayData } = await supabase
        .from('listeners')
        .select('user_id')
        .gte('created_at', startToday);

      const todayListeners = new Set(todayData?.map(l => l.user_id)).size;

      // Duração média
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

      // Completion
      let sessionsQuery = supabase.from('listeners').select('completed');
      if (rangeStart) sessionsQuery = sessionsQuery.gte('created_at', rangeStart);

      const { data: allSessions } = await sessionsQuery;

      const completed = allSessions?.filter(s => s.completed).length || 0;
      const totalSessions = allSessions?.length || 0;

      const completionRate =
        totalSessions > 0 ? (completed / totalSessions) * 100 : 0;

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

      // Recent
      let recentQuery = supabase
        .from('listeners')
        .select('id, created_at, audio_id, duration_seconds, completed')
        .order('created_at', { ascending: false })
        .limit(10);

      if (rangeStart) recentQuery = recentQuery.gte('created_at', rangeStart);

      const { data: recentData } = await recentQuery;

      // Daily stats (Sydney)
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
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  // 🔥 AGORA EM SYDNEY
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
          <p className="text-gray-600 dark:text-gray-400">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* RESTANTE DO JSX PERMANECE IGUAL */}
      </div>
    </div>
  );
};

export default ListenersDashboard;