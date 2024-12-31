interface CacheData<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private static MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

  static async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    forceRefresh: boolean = false
  ): Promise<T> {
    const cachedData = localStorage.getItem(key);

    if (cachedData && !forceRefresh) {
      const parsed: CacheData<T> = JSON.parse(cachedData);
      const isExpired = Date.now() - parsed.timestamp > this.MONTH_IN_MS;

      if (!isExpired) {
        console.log(`Using cached data for ${key}`);
        return parsed.data;
      }
    }

    try {
      console.log(`Fetching fresh data for ${key}`);
      const freshData = await fetchFn();
      
      const cacheData: CacheData<T> = {
        data: freshData,
        timestamp: Date.now(),
      };
      
      localStorage.setItem(key, JSON.stringify(cacheData));
      return freshData;
    } catch (error) {
      // If fetch fails and we have cached data, use it as fallback
      if (cachedData) {
        console.log(`Fetch failed, using cached data for ${key}`);
        const parsed: CacheData<T> = JSON.parse(cachedData);
        return parsed.data;
      }
      throw error;
    }
  }

  static clearCache(key: string) {
    localStorage.removeItem(key);
  }

  static clearAllCache() {
    localStorage.clear();
  }
}
