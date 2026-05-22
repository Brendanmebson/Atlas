import React, { createContext, useContext, useState, useEffect } from 'react';
import { cryptoService } from '../services/cryptoService';

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_change_percentage: number;
  last_updated: string;
}

interface CryptoContextType {
  coins: CryptoCoin[];
  loading: boolean;
  error: string | null;
  currency: string;
  setCurrency: (currency: string) => void;
  refreshData: () => Promise<void>;
  searchCoins: (query: string) => CryptoCoin[];
  getTrendingCoins: () => CryptoCoin[];
  getTopGainers: () => CryptoCoin[];
  getTopLosers: () => CryptoCoin[];
  lastUpdated: Date | null;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState('usd');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCoins = async () => {
    try {
      // Only show loading spinner on initial fetch (when coins list is empty)
      if (coins.length === 0) {
        setLoading(true);
      }
      setError(null);
      const data = await cryptoService.getMarketData(currency);
      setCoins(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch crypto data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchCoins();
  };

  const searchCoins = (query: string): CryptoCoin[] => {
    if (!query.trim()) return coins;
    const lowercaseQuery = query.toLowerCase();
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(lowercaseQuery) ||
      coin.symbol.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getTrendingCoins = (): CryptoCoin[] => {
    return coins.slice(0, 10);
  };

  const getTopGainers = (): CryptoCoin[] => {
    return [...coins]
      .filter(coin => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 10);
  };

  const getTopLosers = (): CryptoCoin[] => {
    return [...coins]
      .filter(coin => coin.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 10);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <CryptoContext.Provider value={{
      coins,
      loading,
      error,
      currency,
      setCurrency,
      refreshData,
      searchCoins,
      getTrendingCoins,
      getTopGainers,
      getTopLosers,
      lastUpdated
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};