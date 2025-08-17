import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaExchangeAlt, FaCoins, FaArrowDown, FaPlus } from 'react-icons/fa';
import CryptoActionModal from '../Modals/CryptoActionModal';
import { useTheme } from '../../contexts/ThemeContext';

const QuickActions: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | 'swap' | 'withdraw' | null>(null);
  const { isDark } = useTheme();

  const actions = [
    {
      id: 'buy',
      label: 'Buy Crypto',
      icon: FaShoppingCart,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      description: 'Purchase cryptocurrencies'
    },
    {
      id: 'sell',
      label: 'Sell Crypto',
      icon: FaCoins,
      color: 'from-red-500 to-rose-600',
      hoverColor: 'hover:from-red-600 hover:to-rose-700',
      description: 'Sell your crypto assets'
    },
    {
      id: 'swap',
      label: 'Swap',
      icon: FaExchangeAlt,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      description: 'Exchange between cryptos'
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: FaArrowDown,
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      description: 'Withdraw to your wallet'
    }
  ];

  const openModal = (action: 'buy' | 'sell' | 'swap' | 'withdraw') => {
    setSelectedAction(action);
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
            <FaPlus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(action.id as any)}
                className={`group relative overflow-hidden bg-gradient-to-br ${action.color} ${action.hoverColor} text-white p-6 rounded-xl shadow-lg transition-all duration-300`}
              >
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">{action.label}</h3>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-500">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trades This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">$12.5K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Volume</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">+15.2%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Gain</div>
            </div>
          </div>
        </div>
      </motion.div>

      {modalOpen && selectedAction && (
        <CryptoActionModal
          initialAction={selectedAction}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default QuickActions;