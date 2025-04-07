import {PATHS} from "@/constants/routes";
import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import {theme} from "@/theme/colors";
import {scheduleLocalNotification} from "@/utils/notification";
import {Storage} from "@/utils/storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {Alert, Linking} from "react-native";

export const ANDROID_CHANNEL_ID = "default";
const ANDROID_CONFIG = {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: theme().accent,
};

export function useNotifications() {
    const [permissionStatus, setPermissionStatus] =
        useState<Notifications.PermissionStatus>();

    useEffect(() => {
        if (
            permissionStatus &&
            permissionStatus !== Notifications.PermissionStatus.GRANTED
        )
            Alert.alert(
                STRINGS.notification.alert_permission_title,
                STRINGS.notification.alert_permission_message,
                [
                    {
                        text: STRINGS.notification.alert_permission_button,
                        onPress: () => Linking.openSettings(),
                    },
                ]
            );
    }, [permissionStatus]);

    useEffect(() => {
        const registerForPushNotificationsAsync = async () => {
            Notifications.setNotificationChannelAsync(
                ANDROID_CHANNEL_ID,
                ANDROID_CONFIG
            );

            const {status: existingStatus} =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            setPermissionStatus(finalStatus);
        };
        const getToken = async (): Promise<string> => {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ??
                Constants?.easConfig?.projectId;
            const token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            return token;
        };

        registerForPushNotificationsAsync()
            .then(async () => {
                const token = await getToken();
                Storage.setItem(STORAGE_ID.notificationToken, token);
            })
            .then(() => {
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: false,
                    }),
                });
                Notifications.addNotificationReceivedListener(
                    (notification) => {
                        const title =
                            notification.request.content.body ||
                            STRINGS.appName;
                        const body =
                            notification.request.content.data.body ||
                            STRINGS.appName;
                        const url = notification.request.content.data.url;
                        scheduleLocalNotification(title, body, {url});
                    }
                );
                Notifications.addNotificationResponseReceivedListener(
                    (response) => {
                        const title =
                            response.notification.request.content.body ||
                            STRINGS.appName;
                        const url =
                            response.notification.request.content.data.url;
                        if (url) router.push(PATHS.WEB(url, title));
                    }
                );
            });
    }, []);

    return {permissionStatus};
}
