import {storage} from "./storage";

interface CacheEntry<T> {
    data: T;
    cacheCreatedAt: number;
}

export const cacheKey = (url: string, method: string) => `${method}:${url}`;

export const setCache = <T>(key: string, data: T) => {
    const cacheEntry: CacheEntry<T> = {
        data: data,
        cacheCreatedAt: Date.now(),
    };
    storage.setItem(key, cacheEntry);
};

export const getCache = async <T>(key: string): Promise<T | null> => {
    const cacheEntry = await storage.getItem(key, null);
    if (!cacheEntry) return null;

    const {data, cacheCreatedAt} = cacheEntry as CacheEntry<T>;
    return {
        ...data,
        cacheCreatedAt,
        getCacheAt: Date.now(),
    } as T;
};
