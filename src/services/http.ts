import {type FetchRequestInit, fetch} from "expo/fetch";
import {cacheKey, getCache, setCache} from "@/utils/cache";

const baseHeaders = {
    Acept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=86400, must-revalidate",
};

const METHOD = {
    GET: "GET",
};

type Http = {
    get: <T>(url: string, headers?: Record<string, string>) => Promise<T>;
    post: <T>(
        url: string,
        body: Record<string, unknown> | Record<string, unknown>[],
        headers?: Record<string, string>
    ) => Promise<T>;
};

export const http: Http = {
    get: async <T>(url: string, headers = {}): Promise<T> => {
        const key = cacheKey(url, METHOD.GET);

        const options: FetchRequestInit = {
            method: METHOD.GET,
            headers: {
                ...baseHeaders,
                ...headers,
            } as HeadersInit,
        };
        const res = await fetch(url, options);
        if (res.status < 200 || res.status >= 300) {
            const cachedData = await getCache<T>(key);
            if (cachedData) return cachedData;
            throw new Error();
        }
        const data = await res.json();
        setCache<T>(key, data);
        return data as T;
    },
    post: async <T>(
        url: string,
        body: Record<string, unknown> | Record<string, unknown>[],
        headers = {}
    ): Promise<T> => {
        const options: FetchRequestInit = {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...headers,
            } as HeadersInit,
            body: JSON.stringify(body),
        };
        const res = await fetch(url, options);
        if (res.status < 200 || res.status >= 300) {
            throw new Error();
        }
        const data = await res.json();
        return data as T;
    },
};
