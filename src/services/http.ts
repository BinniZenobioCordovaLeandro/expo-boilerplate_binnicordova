import {type NestedRecord, cacheKey, getCache, setCache} from "@/utils/cache";
import {type FetchRequestInit, fetch} from "expo/fetch";

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
    get: (
        url: string,
        headers?: Record<string, string>
    ) => Promise<NestedRecord>;
    post: (
        url: string,
        body: Record<string, unknown> | Record<string, unknown>[],
        headers?: Record<string, string>
    ) => Promise<NestedRecord>;
};

export const http: Http = {
    get: async (url, headers = {}): Promise<NestedRecord> => {
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
            const cachedData = await getCache(key);
            if (cachedData) return cachedData;
            throw new Error();
        }
        const data = await res.json();
        setCache(key, data);
        return data;
    },
    post: async (url, body, headers = {}): Promise<NestedRecord> => {
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
        return data;
    },
};
