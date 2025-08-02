import AsyncStorage from "@react-native-async-storage/async-storage";
import type {AsyncStorage as IAsyncStorage} from "jotai/ts3.8/esm/vanilla/utils/atomWithStorage";

const handleError = (operation: string, key: string, error: unknown): never => {
    console.error(`Storage ${operation} failed for key "${key}":`, error);
    throw error;
};

export const storage: IAsyncStorage<any> = {
    getItem: <T>(key: string, defaultValue?: T): Promise<T | undefined> =>
        AsyncStorage.getItem(key)
            .then((value) => (value ? JSON.parse(value) : defaultValue))
            .catch((error) => handleError("getItem", key, error)),

    setItem: <T>(key: string, value: T): Promise<void> =>
        AsyncStorage.setItem(key, JSON.stringify(value)).catch((error) =>
            handleError("setItem", key, error)
        ),

    removeItem: (key: string): Promise<void> =>
        AsyncStorage.removeItem(key).catch((error) =>
            handleError("removeItem", key, error)
        ),
};
