interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
const memoryCache = new Map<string, CacheItem<any>>();

export const cacheService = {
  get<T>(key: string): T | null {
    // Check memory cache first
    const memoryItem = memoryCache.get(key);
    if (memoryItem && Date.now() - memoryItem.timestamp < CACHE_DURATION) {
      return memoryItem.data as T;
    }

    // Check localStorage
    const item = localStorage.getItem(key);
    if (item) {
      const parsedItem: CacheItem<T> = JSON.parse(item);
      if (Date.now() - parsedItem.timestamp < CACHE_DURATION) {
        // Update memory cache
        memoryCache.set(key, parsedItem);
        return parsedItem.data;
      }
      // Remove expired item
      localStorage.removeItem(key);
      memoryCache.delete(key);
    }

    return null;
  },

  set<T>(key: string, data: T): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };

    // Update both memory and localStorage
    memoryCache.set(key, cacheItem);
    localStorage.setItem(key, JSON.stringify(cacheItem));
  },

  remove(key: string): void {
    memoryCache.delete(key);
    localStorage.removeItem(key);
  },

  clear(): void {
    memoryCache.clear();
    localStorage.clear();
  },
};
