import {STORAGE_ID} from "@/constants/storage";
import type {Category} from "@/models/category";
import {api} from "@/services/api";
import {Storage} from "@/utils/storage";
import {useCallback, useEffect, useState} from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

    useEffect(() => {
        Storage.getItem(STORAGE_ID.favoriteCategories).then((data) => {
            if (data) setFavoriteCategories(JSON.parse(data));
        });
    }, []);

    const toggleFavoriteCategory = async (category: Category) => {
        setFavoriteCategories((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(category.name)
                ? prevFavorites.filter((name) => name !== category.name)
                : [...prevFavorites, category.name];
            return updatedFavorites;
        });
    };

    useEffect(() => {
        if (favoriteCategories.length > 0)
            Storage.setItem(
                STORAGE_ID.favoriteCategories,
                JSON.stringify(favoriteCategories)
            );
    }, [favoriteCategories]);

    const loadCategories = useCallback(async () => {
        setLoading(true);
        api.getCategories()
            .then((data) => setCategories(data))
            .then(() => setError(null))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return {
        categories: categories.map((category) => ({
            ...category,
            isFavorite: favoriteCategories.includes(category.name),
        })),
        favoriteCategories,
        toggleFavoriteCategory,
        loading,
        error,
        refresh: loadCategories,
    };
};
