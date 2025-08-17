export const formatCurrency = (amount: number, currency: string = 'usd'): string => {
  const currencySymbols: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
    btc: '₿',
    eth: 'Ξ'
  };

  const symbol = currencySymbols[currency.toLowerCase()] || '$';
  
  if (amount >= 1e9) {
    return `${symbol}${(amount / 1e9).toFixed(2)}B`;
  }
  if (amount >= 1e6) {
    return `${symbol}${(amount / 1e6).toFixed(2)}M`;
  }
  if (amount >= 1e3) {
    return `${symbol}${(amount / 1e3).toFixed(2)}K`;
  }
  
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  })}`;
};

export const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const truncateAddress = (address: string, chars: number = 4): string => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};