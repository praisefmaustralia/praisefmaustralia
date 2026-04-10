import React from 'react';
import { Users, Clock, Radio, TrendingUp, Calendar, Activity } from 'lucide-react';

const ListenersDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <Activity className="w-16 h-16 text-[#ff6600] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Listener Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
          Statistics feature coming soon. Check back later for listener analytics.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            <p>Praise FM Australia - Sydney Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListenersDashboard;