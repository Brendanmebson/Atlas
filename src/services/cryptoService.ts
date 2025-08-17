const BASE_URL = 'https://api.coingecko.com/api/v3';

export class CryptoService {
  private async fetchWithRetry(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  async getMarketData(currency = 'usd', perPage = 100) {
    const url = `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=7d`;
    return this.fetchWithRetry(url);
  }

  async getCoinDetails(coinId: string) {
    const url = `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    return this.fetchWithRetry(url);
  }

  async getHistoricalData(coinId: string, days = 7) {
    const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    return this.fetchWithRetry(url);
  }

  async getTrendingCoins() {
    const url = `${BASE_URL}/search/trending`;
    return this.fetchWithRetry(url);
  }

  async getExchangeRates() {
    const url = `${BASE_URL}/exchange_rates`;
    return this.fetchWithRetry(url);
  }

  async searchCoins(query: string) {
    const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
    return this.fetchWithRetry(url);
  }
}

export const cryptoService = new CryptoService();