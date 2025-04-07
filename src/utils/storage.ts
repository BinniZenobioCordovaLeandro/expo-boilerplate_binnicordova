import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageType = {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
};

export const Storage: StorageType = {
    setItem: (key: string, value: string): Promise<void> =>
        AsyncStorage.setItem(key, value).catch((error) =>
            console.error("Error setting item in AsyncStorage", error)
        ),

    getItem: (key: string): Promise<string | null> =>
        AsyncStorage.getItem(key).catch((error) => {
            console.error("Error getting item from AsyncStorage", error);
            return null;
        }),

    removeItem: (key: string): Promise<void> =>
        AsyncStorage.removeItem(key).catch((error) =>
            console.error("Error removing item from AsyncStorage", error)
        ),

    clear: (): Promise<void> =>
        AsyncStorage.clear().catch((error) =>
            console.error("Error clearing AsyncStorage", error)
        ),
};
