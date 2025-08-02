import {initBackgroundFetch} from "./hooks/useBackgroundFetch";
import {initNotification} from "./hooks/useNotification";

initBackgroundFetch();
initNotification();

import "expo-router/entry";
