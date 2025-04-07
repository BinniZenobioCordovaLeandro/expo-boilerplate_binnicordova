import {fetchArticlesTask} from "@/tasks";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {useEffect} from "react";

const TASK_INTERVAL = 30 * 60;
const TASK_CONFIGURATION: BackgroundFetch.BackgroundFetchOptions = {
    minimumInterval: TASK_INTERVAL,
    stopOnTerminate: false,
    startOnBoot: true,
};

const BACKGROUND_FETCH_ARTICLES_TASK = "background-fetch-articles-task";
TaskManager.defineTask(BACKGROUND_FETCH_ARTICLES_TASK, fetchArticlesTask);

export const useBackgroundFetch = () => {
    useEffect(() => {
        BackgroundFetch.registerTaskAsync(
            BACKGROUND_FETCH_ARTICLES_TASK,
            TASK_CONFIGURATION
        );
    }, []);

    return {};
};
