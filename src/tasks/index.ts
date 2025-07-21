import * as BackgroundTask from "expo-background-task";
import {getDefaultStore} from "jotai";
import {articlesAtom, fetchArticlesAtom} from "@/stores/articlesStore";
import {favoriteCategoriesAtom} from "@/stores/categoriesStore";
import {getArticlesMatchs} from "@/utils/matcher";
import {scheduleLocalNotification} from "@/utils/notification";

export enum TASKS {
    FETCH_ARTICLES = "fetch-articles",
    NOTIFY_MATCH_HITS = "notify-match-hits",
}

export const fetchArticlesTask = async () => {
    try {
        const store = getDefaultStore();
        const result = await store.set(fetchArticlesAtom);

        return result.success
            ? BackgroundTask.BackgroundTaskResult.Success
            : BackgroundTask.BackgroundTaskResult.Failed;
    } catch (_error) {
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
};

export const notifyMatchHits = async () => {
    try {
        const store = getDefaultStore();

        const articles = await store.get(articlesAtom);
        if (!articles.length) return;

        const favoriteCategories = await store.get(favoriteCategoriesAtom);

        if (!articles.length || !favoriteCategories.length) return;

        const matchedHits = getArticlesMatchs(articles, favoriteCategories);

        if (matchedHits.length > 0) {
            const message = `Found ${matchedHits.length} new articles!`;
            await scheduleLocalNotification("New Articles Available", message, {
                hits: matchedHits,
            });
        }
        return BackgroundTask.BackgroundTaskResult.Success;
    } catch (error) {
        console.error("Error notifying match hits:", error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
};
