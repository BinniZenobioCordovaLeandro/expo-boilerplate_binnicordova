import {API_URL, SEARCH_QUERY} from "@/constants/env";
import type {Article, ArticleResponse} from "@/models/article";
import type {Category} from "@/models/category";
import {http} from "./http";
import categoriesMock from "./mocks/categories.json";

type API = {
    getCategories: () => Promise<Category[]>;
    getArticles: (query: string) => Promise<Article[]>;
};

export const api: API = {
    getCategories: () => Promise.resolve(categoriesMock as Category[]),
    getArticles: async (query: string) => {
        const API = `${API_URL}${SEARCH_QUERY}${query}`;
        const data = await http.get<ArticleResponse>(API);
        return data.hits as Article[];
    },
};
