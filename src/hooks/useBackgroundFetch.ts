import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import {fetchArticlesTask, notifyMatchHits, TASKS} from "@/tasks";

const TASK_INTERVAL = 60 * 60 * 24;
const TASK_CONFIGURATION: BackgroundTask.BackgroundTaskOptions = {
    minimumInterval: TASK_INTERVAL,
};

TaskManager.defineTask(TASKS.FETCH_ARTICLES, fetchArticlesTask);
TaskManager.defineTask(TASKS.NOTIFY_MATCH_HITS, notifyMatchHits);

export const initBackgroundFetch = async () => {
    BackgroundTask.registerTaskAsync(TASKS.FETCH_ARTICLES, TASK_CONFIGURATION);
    BackgroundTask.registerTaskAsync(
        TASKS.NOTIFY_MATCH_HITS,
        TASK_CONFIGURATION
    );
};
