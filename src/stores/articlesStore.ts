import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import {STORAGE_ID} from "@/constants/storage";
import type {Article} from "@/models/article";
import {api} from "@/services/api";
import {storage} from "@/utils/storage";
import {favoriteCategoriesAtom} from "./categoriesStore";

export const articlesAtom = atomWithStorage<Article[]>(
    STORAGE_ID.articles,
    [],
    storage
);
export const articlesLoadingAtom = atom(false);
export const articlesErrorAtom = atom<string | null>(null);

export const fetchArticlesAtom = atom(null, async (get, set) => {
    set(articlesLoadingAtom, true);
    set(articlesErrorAtom, null);

    try {
        const favoriteCategories = await get(favoriteCategoriesAtom);
        const articles = await api.getArticles(favoriteCategories.join(","));

        set(articlesAtom, articles);
        set(articlesLoadingAtom, false);

        return {success: true, articles};
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch articles";
        set(articlesErrorAtom, errorMessage);
        set(articlesLoadingAtom, false);

        return {success: false, error: errorMessage};
    }
});
