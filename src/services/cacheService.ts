interface CacheData<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  static async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    forceRefresh: boolean = false
  ): Promise<T> {
    if (!forceRefresh) {
      const cachedData = this.getCache<T>(key);
      if (cachedData) {
        return cachedData;
      }
    }

    const freshData = await fetchFn();
    this.setCache(key, freshData);
    return freshData;
  }

  static getCache<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const { data, timestamp } = JSON.parse(item);
      const now = Date.now();
      const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

      if (now - timestamp > CACHE_DURATION) {
        this.clearCache(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  static setCache(key: string, data: any): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  }

  static clearCache(key: string): void {
    localStorage.removeItem(key);
  }

  static clearAllCache(): void {
    localStorage.clear();
  }

  static forceRefresh(key: string): void {
    this.clearCache(key);
  }
}
