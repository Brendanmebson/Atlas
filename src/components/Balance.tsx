import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaRefresh } from 'react-icons/fa';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useCrypto } from '../../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const Balance: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const { portfolio, totalValue, totalChange } = usePortfolio();
  const { currency, refreshData } = useCrypto();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const isPositive = totalChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium opacity-90">Total Portfolio Value</h2>
            <div className="flex items-center gap-2 mt-1">
              {(['24h', '7d', '30d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    timeframe === period
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all ${
                refreshing ? 'animate-spin' : ''
              }`}
            >
              <FaRefresh className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              {showBalance ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Balance Display */}
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            {showBalance ? formatCurrency(totalValue, currency) : '••••••••'}
          </div>
          
          <div className={`flex items-center gap-2 text-lg ${
            isPositive ? 'text-green-300' : 'text-red-300'
          }`}>
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            <span>
              {showBalance ? formatPercentage(totalChange) : '••••'}
            </span>
            <span className="text-white/70 text-sm">({timeframe})</span>
          </div>
        </div>

        {/* Portfolio Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolio.slice(0, 4).map((asset) => (
            <motion.div
              key={asset.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 rounded-lg p-3 backdrop-blur"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={asset.image} alt={asset.name} className="w-6 h-6" />
                <span className="font-medium text-sm">{asset.symbol.toUpperCase()}</span>
              </div>
              <div className="text-lg font-semibold">
                {showBalance ? formatCurrency(asset.value, currency) : '••••'}
              </div>
              <div className={`text-xs ${
                asset.change_24h >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {showBalance ? formatPercentage(asset.change_24h) : '••••'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Balance;