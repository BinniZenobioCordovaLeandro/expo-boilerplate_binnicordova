import type {Href} from "expo-router";

type WebPath = (uri: string, title: string) => Href;

interface PathsProps {
    HOME: Href;
    NEWS: Href;
    WEB: WebPath;
}

export const PATHS: PathsProps = {
    HOME: "/",
    NEWS: "/news",
    WEB: (uri, title) =>
        `/web?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}`,
};
