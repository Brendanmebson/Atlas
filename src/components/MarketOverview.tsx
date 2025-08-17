import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaFilter, FaSearch } from 'react-icons/fa';
import { useCrypto } from '../../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import LoadingSpinner from '../ui/LoadingSpinner';

const MarketOverview: React.FC = () => {
  const { coins, loading, currency } = useCrypto();
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = coins
    .filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(coin => {
      if (filter === 'gainers') return coin.price_change_percentage_24h > 0;
      if (filter === 'losers') return coin.price_change_percentage_24h < 0;
      return true;
    })
    .slice(0, 10);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Overview</h2>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-transparent text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            {(['all', 'gainers', 'losers'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  filter === filterType
                    ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                ${(2.1).toFixed(1)}T
              </p>
            </div>
            <FaArrowUp className="text-green-500 w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${(85.3).toFixed(1)}B
              </p>
            </div>
            <FaArrowUp className="text-blue-500 w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {(52.3).toFixed(1)}%
              </p>
            </div>
            <FaArrowDown className="text-red-500 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Coins Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Coin</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">24h</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin, index) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{coin.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4 px-2 font-medium text-gray-900 dark:text-white">
                  {formatCurrency(coin.current_price, currency)}
                </td>
                <td className={`text-right py-4 px-2 font-medium ${
                  coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  <div className="flex items-center justify-end space-x-1">
                    {coin.price_change_percentage_24h >= 0 ? 
                      <FaArrowUp className="w-3 h-3" /> : 
                      <FaArrowDown className="w-3 h-3" />
                    }
                    <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
                  </div>
                </td>
                <td className="text-right py-4 px-2 font-medium text-gray-900 dark:text-white">
                  ${(coin.market_cap / 1e9).toFixed(1)}B
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MarketOverview;