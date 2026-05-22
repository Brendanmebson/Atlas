import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCrypto } from './CryptoContext';

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  value: number;
  change_24h: number;
  pnl: number;
  pnlPercentage: number;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'swap';
  coinId: string;
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

interface PortfolioContextType {
  portfolio: PortfolioAsset[];
  transactions: Transaction[];
  totalValue: number;
  totalPnL: number;
  totalChange: number;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  updatePortfolio: () => void;
  getAssetBySymbol: (symbol: string) => PortfolioAsset | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { coins } = useCrypto();
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Mock initial portfolio data
  useEffect(() => {
    const mockPortfolio: PortfolioAsset[] = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        amount: 0.5,
        avgBuyPrice: 45000,
        currentPrice: 0,
        value: 0,
        change_24h: 0,
        pnl: 0,
        pnlPercentage: 0
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        amount: 3.2,
        avgBuyPrice: 3000,
        currentPrice: 0,
        value: 0,
        change_24h: 0,
        pnl: 0,
        pnlPercentage: 0
      },
      {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        amount: 50,
        avgBuyPrice: 25,
        currentPrice: 0,
        value: 0,
        change_24h: 0,
        pnl: 0,
        pnlPercentage: 0
      }
    ];
    setPortfolio(mockPortfolio);
  }, []);

  // Update portfolio with current prices
  useEffect(() => {
    if (coins.length > 0) {
      setPortfolio(prev => prev.map(asset => {
        const coinData = coins.find(coin => coin.id === asset.id);
        if (coinData) {
          const currentValue = asset.amount * coinData.current_price;
          const initialValue = asset.amount * asset.avgBuyPrice;
          const pnl = currentValue - initialValue;
          const pnlPercentage = (pnl / initialValue) * 100;

          return {
            ...asset,
            currentPrice: coinData.current_price,
            value: currentValue,
            change_24h: coinData.price_change_percentage_24h,
            pnl,
            pnlPercentage
          };
        }
        return asset;
      }));
    }
  }, [coins]);

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0);
  const totalPnL = portfolio.reduce((sum, asset) => sum + asset.pnl, 0);
  const totalChange = portfolio.reduce((sum, asset) => sum + (asset.change_24h * asset.value / 100), 0) / totalValue * 100;

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);

    // Update portfolio based on transaction
    if (transaction.type === 'buy') {
      setPortfolio(prev => {
        const existingAsset = prev.find(asset => asset.id === transaction.coinId);
        if (existingAsset) {
          const newAmount = existingAsset.amount + transaction.amount;
          const newAvgPrice = ((existingAsset.amount * existingAsset.avgBuyPrice) + transaction.total) / newAmount;
          return prev.map(asset => 
            asset.id === transaction.coinId 
              ? { ...asset, amount: newAmount, avgBuyPrice: newAvgPrice }
              : asset
          );
        } else {
          // Add new asset to portfolio
          const coinData = coins.find(coin => coin.id === transaction.coinId);
          if (coinData) {
            const newAsset: PortfolioAsset = {
              id: coinData.id,
              symbol: coinData.symbol,
              name: coinData.name,
              image: coinData.image,
              amount: transaction.amount,
              avgBuyPrice: transaction.price,
              currentPrice: coinData.current_price,
              value: transaction.amount * coinData.current_price,
              change_24h: coinData.price_change_percentage_24h,
              pnl: 0,
              pnlPercentage: 0
            };
            return [...prev, newAsset];
          }
        }
        return prev;
      });
    }
  };

  const updatePortfolio = () => {
    // Trigger portfolio recalculation
  };

  const getAssetBySymbol = (symbol: string): PortfolioAsset | undefined => {
    return portfolio.find(asset => asset.symbol.toLowerCase() === symbol.toLowerCase());
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      transactions,
      totalValue,
      totalPnL,
      totalChange,
      addTransaction,
      updatePortfolio,
      getAssetBySymbol
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};