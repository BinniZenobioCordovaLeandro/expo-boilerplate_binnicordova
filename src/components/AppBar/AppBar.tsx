import {Text} from "@/components/Text/Text";
import {FONT_SIZE} from "@/theme/fonts";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./AppBar.styles";

type AppBarProps = {
    title?: string;
    actions?: () => React.ReactNode;
};

export const AppBar: React.FC<AppBarProps> = ({
    title,
    actions: appBarActions,
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => navigation.canGoBack() && navigation.goBack();

    return (
        <View style={styles.container}>
            {navigation.canGoBack() && (
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons size={FONT_SIZE[3]} name="chevron-back-outline" />
                </TouchableOpacity>
            )}
            <Text type="label" numberOfLines={2} style={styles.title}>
                {title}
            </Text>
            {appBarActions?.()}
        </View>
    );
};
