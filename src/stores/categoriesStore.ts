import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import {STORAGE_ID} from "@/constants/storage";
import type {Category} from "@/models/category";
import {api} from "@/services/api";
import {storage} from "@/utils/storage";

export const categoriesAtom = atomWithStorage<Category[]>(
    STORAGE_ID.categories,
    [],
    storage
);

export const categoriesLoadingAtom = atom(false);
export const categoriesErrorAtom = atom<string | null>(null);
export const favoriteCategoriesAtom = atomWithStorage<string[]>(
    STORAGE_ID.favoriteCategories,
    [],
    storage
);

export const favoritesLastUpdatedAtom = atomWithStorage<number>(
    STORAGE_ID.favoritesLastUpdated,
    Date.now(),
    storage
);

export const fetchCategoriesAtom = atom(null, async (_, set) => {
    set(categoriesLoadingAtom, true);
    set(categoriesErrorAtom, null);

    try {
        const categories = await api.getCategories();

        set(categoriesAtom, categories);
        set(categoriesLoadingAtom, false);

        return {success: true, categories};
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to fetch categories";
        set(categoriesErrorAtom, errorMessage);
        set(categoriesLoadingAtom, false);

        return {success: false, error: errorMessage};
    }
});

export const toggleFavoriteCategoryAtom = atom(
    null,
    async (get, set, category: Category) => {
        const currentFavorites = await get(favoriteCategoriesAtom);
        const safeFavorites = Array.isArray(currentFavorites)
            ? currentFavorites
            : [];

        const updatedFavorites = safeFavorites.includes(category.name)
            ? safeFavorites.filter((name: string) => name !== category.name)
            : [...safeFavorites, category.name];

        set(favoriteCategoriesAtom, updatedFavorites);
        set(favoritesLastUpdatedAtom, Date.now());
    }
);
