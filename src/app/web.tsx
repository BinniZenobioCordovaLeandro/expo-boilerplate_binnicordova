import {useLocalSearchParams} from "expo-router";
import {View} from "react-native";
import {WebView} from "react-native-webview";
import {AppBar} from "@/components/AppBar/AppBar";
import {Text} from "@/components/Text/Text";
import {STRINGS} from "@/constants/strings";
import {styles} from "@/styles";

const WebScreen: React.FC = () => {
    const searchParams = useLocalSearchParams();
    const uri = searchParams.uri as string;
    const title = searchParams.title as string;

    if (!uri) {
        return (
            <Text type="error" style={styles.informationText}>
                {STRINGS.web.invalid_url}
            </Text>
        );
    }

    return (
        <View style={[styles.safeArea, styles.baseLayer]}>
            <AppBar title={title} />
            <WebView source={{uri}} />
        </View>
    );
};

export default WebScreen;
