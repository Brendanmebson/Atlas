import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Balance from '../components/Balance/Balance';
import QuickActions from '../components/QuickActions/QuickActions';
import MarketOverview from '../components/Market/MarketOverview';
import PortfolioSummary from '../components/Portfolio/PortfolioSummary';
import TrendingCoins from '../components/Market/TrendingCoins';
import RecentTransactions from '../components/Transactions/RecentTransactions';
import PriceAlerts from '../components/Alerts/PriceAlerts';
import NewsWidget from '../components/News/NewsWidget';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCrypto } from '../contexts/CryptoContext';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const { loading, error } = useCrypto();
  const { isDark } = useTheme();
  const [activeView, setActiveView] = useState<'overview' | 'trading' | 'analytics'>('overview');

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to CryptoDash
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your comprehensive cryptocurrency trading platform
          </p>
        </div>
        
        <div className="flex gap-2">
          {(['overview', 'trading', 'analytics'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === view
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          <Balance />
          <QuickActions />
          <MarketOverview />
          {activeView === 'overview' && <PortfolioSummary />}
          {activeView === 'trading' && <TrendingCoins />}
          {activeView === 'analytics' && <div>Analytics View Coming Soon</div>}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <PriceAlerts />
          <RecentTransactions />
          <NewsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;