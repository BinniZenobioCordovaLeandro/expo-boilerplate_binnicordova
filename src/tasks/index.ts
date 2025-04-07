import {API_URL} from "@/constants/env";
import * as BackgroundFetch from "expo-background-fetch";
import {fetch} from "expo/fetch";

export const fetchArticlesTask = async () => {
    try {
        const response = await fetch(API_URL);
        if (response.status !== 200) {
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }
        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
};
