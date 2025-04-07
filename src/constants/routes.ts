import type { Href } from "expo-router";

type Routes = "HOME" | "WEB";

type PathsProps = Record<Routes, Href | ((...args: string[]) => Href)>;

export const PATHS: PathsProps = {
    HOME: "/",
    WEB: (uri, title) =>
        `/web?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}`,
};
