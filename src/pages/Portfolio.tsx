import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaEye, FaEyeSlash, FaPieChart, FaList } from 'react-icons/fa';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Portfolio: React.FC = () => {
  const { portfolio, totalValue, totalPnL, transactions } = usePortfolio();
  const { currency } = useCrypto();
  const [showValues, setShowValues] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

  const chartData = portfolio.map(asset => ({
    name: asset.symbol.toUpperCase(),
    value: asset.value,
    percentage: (asset.value / totalValue) * 100
  }));

  const performanceData = portfolio.map(asset => ({
    name: asset.symbol.toUpperCase(),
    pnl: asset.pnl,
    pnlPercentage: asset.pnlPercentage
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your crypto investments and performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowValues(!showValues)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            {showValues ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
          </button>

          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-600 shadow-sm'
                  : 'hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <FaPieChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-600 shadow-sm'
                  : 'hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white"
        >
          <h3 className="text-lg font-medium opacity-90 mb-2">Total Portfolio Value</h3>
          <div className="text-3xl font-bold mb-2">
            {showValues ? formatCurrency(totalValue, currency) : '••••••••'}
          </div>
          <div className={`flex items-center gap-2 ${totalPnL >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {totalPnL >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            <span>{showValues ? formatCurrency(Math.abs(totalPnL), currency) : '••••'}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">24h Change</h3>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {showValues ? formatPercentage(2.45) : '••••'}
          </div>
          <div className="text-green-500">
            +{showValues ? formatCurrency(1250, currency) : '••••'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Assets</h3>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {portfolio.length}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {transactions.length} total transactions
          </div>
        </motion.div>
      </div>

      {/* Charts and Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Allocation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.map((asset, index) => (
              <div key={asset.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {asset.name} ({asset.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `${value.toFixed(2)}%`,
                    'P&L %'
                  ]}
                />
                <Bar dataKey="pnlPercentage" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Assets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Assets</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Holdings</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">Value</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">24h Change</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((asset, index) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img src={asset.image} alt={asset.name} className="w-10 h-10" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {asset.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {showValues ? asset.amount.toFixed(6) : '••••••'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Avg: {showValues ? formatCurrency(asset.avgBuyPrice, currency) : '••••'}
                    </div>
                  </td>
                  <td className="text-right py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {showValues ? formatCurrency(asset.value, currency) : '••••••'}
                  </td>
                  <td className={`text-right py-4 px-6 font-medium ${
                    asset.change_24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <div className="flex items-center justify-end space-x-1">
                      {asset.change_24h >= 0 ? 
                        <FaArrowUp className="w-3 h-3" /> : 
                        <FaArrowDown className="w-3 h-3" />
                      }
                      <span>{showValues ? formatPercentage(asset.change_24h) : '••••'}</span>
                    </div>
                  </td>
                  <td className={`text-right py-4 px-6 font-medium ${
                    asset.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <div>{showValues ? formatCurrency(asset.pnl, currency) : '••••••'}</div>
                    <div className="text-sm">
                      {showValues ? formatPercentage(asset.pnlPercentage) : '••••'}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;