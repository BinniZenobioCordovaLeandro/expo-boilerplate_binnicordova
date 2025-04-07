import {Storage} from "./storage";

const localStorage = Storage;

export type NestedRecord = {[key: string]: {[key: string]: string}};

export const cacheKey = (url: string, method: string) => `${method}:${url}`;

export const setCache = (key: string, data: NestedRecord) => {
    const cacheEntry = {
        data: data,
        cacheCreatedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getCache = async (key: string): Promise<NestedRecord | null> => {
    const cacheEntry = await localStorage.getItem(key);
    if (!cacheEntry) return null;

    const {data, cacheCreatedAt} = JSON.parse(cacheEntry);
    return {
        ...data,
        cacheCreatedAt,
        getCacheAt: Date.now(),
    };
};
