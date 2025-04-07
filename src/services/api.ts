import type {Category} from "@/models/category";
import categoriesMock from "./mocks/categories.json";

type API = {
    getCategories: () => Promise<Category[]>;
};

export const api: API = {
    getCategories: () => Promise.resolve(categoriesMock as Category[]),
};
