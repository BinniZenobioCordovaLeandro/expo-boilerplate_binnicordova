import {API_URL} from "@/constants/env";
import type {Article, ArticleResponse} from "@/models/article";
import type {Category} from "@/models/category";
import {http} from "./http";
import categoriesMock from "./mocks/categories.json";

type API = {
    getCategories: () => Promise<Category[]>;
    getArticles: () => Promise<Article[]>;
};

export const api: API = {
    getCategories: () => Promise.resolve(categoriesMock as Category[]),
    getArticles: async () => {
        const data = await http.get<ArticleResponse>(API_URL);
        return data.hits as Article[];
    },
};
