import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExchangeAlt, FaSearch, FaWallet } from 'react-icons/fa';
import { useCrypto } from Modals'../../contexts/CryptoContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatCurrency } from '../../utils/formatters';
import toast from 'react-hot-toast';

interface CryptoActionModalProps {
  initialAction: 'buy' | 'sell' | 'swap' | 'withdraw';
  onClose: () => void;
}

const CryptoActionModal: React.FC<CryptoActionModalProps> = ({ initialAction, onClose }) => {
  const [action, setAction] = useState(initialAction);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCoinList, setShowCoinList] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { coins, currency } = useCrypto();
  const { portfolio, addTransaction } = usePortfolio();

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  const selectedCoinData = coins.find(coin => coin.id === selectedCoin);
  const portfolioAsset = portfolio.find(asset => asset.id === selectedCoin);

  const isFormValid = selectedCoin && amount && parseFloat(amount) > 0;

  const handleSubmit = async () => {
    if (!isFormValid || !selectedCoinData) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (action === 'buy') {
        addTransaction({
          type: 'buy',
          coinId: selectedCoin,
          amount: parseFloat(amount),
          price: selectedCoinData.current_price,
          total: parseFloat(amount) * selectedCoinData.current_price,
          status: 'completed'
        });
        toast.success(`Successfully bought ${amount} ${selectedCoinData.symbol.toUpperCase()}`);
      } else if (action === 'sell') {
        addTransaction({
          type: 'sell',
          coinId: selectedCoin,
          amount: parseFloat(amount),
          price: selectedCoinData.current_price,
          total: parseFloat(amount) * selectedCoinData.current_price,
          status: 'completed'
        });
        toast.success(`Successfully sold ${amount} ${selectedCoinData.symbol.toUpperCase()}`);
      }

      onClose();
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {action.charAt(0).toUpperCase() + action.slice(1)} Crypto
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Action Tabs */}
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            {(['buy', 'sell', 'swap', 'withdraw'] as const).map((actionType) => (
              <button
                key={actionType}
                onClick={() => setAction(actionType)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  action === actionType
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Coin Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Cryptocurrency
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowCoinList(!showCoinList)}
                  className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                >
                  {selectedCoinData ? (
                    <div className="flex items-center space-x-3">
                      <img src={selectedCoinData.image} alt={selectedCoinData.name} className="w-6 h-6" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedCoinData.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCoinData.symbol.toUpperCase()}
                      </span>
                    </div>
                  ) : (
                                       <span className="text-gray-500 dark:text-gray-400">Select a cryptocurrency</span>
                 )}
                 <FaSearch className="w-4 h-4 text-gray-400" />
               </button>

               <AnimatePresence>
                 {showCoinList && (
                   <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                   >
                     <div className="p-3 border-b border-gray-200 dark:border-slate-600">
                       <div className="relative">
                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                         <input
                           type="text"
                           placeholder="Search cryptocurrencies..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-transparent text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           autoFocus
                         />
                       </div>
                     </div>
                     
                     <div className="max-h-48 overflow-y-auto">
                       {filteredCoins.map((coin) => (
                         <button
                           key={coin.id}
                           onClick={() => {
                             setSelectedCoin(coin.id);
                             setShowCoinList(false);
                             setSearchTerm('');
                           }}
                           className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                         >
                           <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                           <div className="flex-1 text-left">
                             <div className="font-medium text-gray-900 dark:text-white">{coin.name}</div>
                             <div className="text-sm text-gray-500 dark:text-gray-400">
                               {coin.symbol.toUpperCase()}
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="font-medium text-gray-900 dark:text-white">
                               {formatCurrency(coin.current_price, currency)}
                             </div>
                             <div className={`text-sm ${
                               coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                             }`}>
                               {coin.price_change_percentage_24h.toFixed(2)}%
                             </div>
                           </div>
                         </button>
                       ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           </div>

           {/* Amount Input */}
           <div>
             <div className="flex items-center justify-between mb-2">
               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                 Amount
               </label>
               {portfolioAsset && action === 'sell' && (
                 <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                   <FaWallet className="w-3 h-3" />
                   <span>Available: {portfolioAsset.amount.toFixed(6)}</span>
                 </div>
               )}
             </div>
             
             <div className="relative">
               <input
                 type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="0.00"
                 min="0"
                 step="any"
                 className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
               {selectedCoinData && (
                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                   {selectedCoinData.symbol.toUpperCase()}
                 </div>
               )}
             </div>

             {/* Quick Amount Buttons */}
             {portfolioAsset && action === 'sell' && (
               <div className="flex gap-2 mt-2">
                 {[25, 50, 75, 100].map((percentage) => (
                   <button
                     key={percentage}
                     onClick={() => setAmount((portfolioAsset.amount * percentage / 100).toString())}
                     className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-md transition-colors"
                   >
                     {percentage}%
                   </button>
                 ))}
               </div>
             )}
           </div>

           {/* Transaction Summary */}
           {selectedCoinData && amount && parseFloat(amount) > 0 && (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 space-y-2"
             >
               <div className="flex justify-between text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Price per {selectedCoinData.symbol.toUpperCase()}</span>
                 <span className="font-medium text-gray-900 dark:text-white">
                   {formatCurrency(selectedCoinData.current_price, currency)}
                 </span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Amount</span>
                 <span className="font-medium text-gray-900 dark:text-white">
                   {parseFloat(amount).toFixed(6)} {selectedCoinData.symbol.toUpperCase()}
                 </span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Estimated Fee</span>
                 <span className="font-medium text-gray-900 dark:text-white">
                   {formatCurrency(parseFloat(amount) * selectedCoinData.current_price * 0.001, currency)}
                 </span>
               </div>
               <div className="border-t border-gray-200 dark:border-slate-600 pt-2">
                 <div className="flex justify-between">
                   <span className="font-medium text-gray-900 dark:text-white">Total</span>
                   <span className="font-bold text-lg text-gray-900 dark:text-white">
                     {formatCurrency(parseFloat(amount) * selectedCoinData.current_price, currency)}
                   </span>
                 </div>
               </div>
             </motion.div>
           )}

           {/* Action Button */}
           <button
             onClick={handleSubmit}
             disabled={!isFormValid || isProcessing}
             className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
               isFormValid && !isProcessing
                 ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                 : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
             }`}
           >
             {isProcessing ? (
               <div className="flex items-center justify-center space-x-2">
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                 <span>Processing...</span>
               </div>
             ) : (
               `${action.charAt(0).toUpperCase() + action.slice(1)} ${selectedCoinData?.symbol.toUpperCase() || 'Crypto'}`
             )}
           </button>
         </div>
       </motion.div>
     </motion.div>
   </AnimatePresence>
 );
};

export default CryptoActionModal;