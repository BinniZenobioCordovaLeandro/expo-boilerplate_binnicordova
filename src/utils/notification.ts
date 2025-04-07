import {ANDROID_CHANNEL_ID} from "@/hooks/useNotification";
import * as Notifications from "expo-notifications";

export const scheduleLocalNotification = async (
    title: string,
    body: string,
    data: {[key: string]: unknown}
) =>
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            channelId: ANDROID_CHANNEL_ID,
            seconds: 2,
            repeats: false,
        },
    });
