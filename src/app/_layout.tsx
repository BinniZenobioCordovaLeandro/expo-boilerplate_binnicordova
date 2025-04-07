import {styles} from "@/styles";
import {theme} from "@/theme/colors";
import {useFonts} from "expo-font";
import {Slot} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const FONT_SETTINGS = {
    MaterialCommunityIcons: require("../../assets/fonts/MaterialCommunityIcons.ttf"),
    LatoLight: require("../../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../../assets/fonts/Lato-Bold.ttf"),
};

const RootLayout = () => {
    const COLORS = theme();

    const [loaded] = useFonts(FONT_SETTINGS);

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.baseLayer, {backgroundColor: COLORS.background}]}>
            <StatusBar style="auto" />
            <SafeAreaView style={styles.baseLayer}>
                <Slot />
            </SafeAreaView>
        </View>
    );
};

let AppEntryPoint = RootLayout;

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    AppEntryPoint = require("../../.rnstorybook").default;
    SplashScreen.hideAsync();
}

export default AppEntryPoint;
