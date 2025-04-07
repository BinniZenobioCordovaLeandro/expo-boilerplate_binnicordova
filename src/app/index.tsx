import {AppBar} from "@/components/AppBar/AppBar";
import {Button} from "@/components/Button/Button";
import {Icon} from "@/components/Icon/Icon";
import {Text} from "@/components/Text/Text";
import {PATHS} from "@/constants/routes";
import {STRINGS} from "@/constants/strings";
import {useCategories} from "@/hooks/useCategories";
import type {Category} from "@/models/category";
import {styles} from "@/styles";
import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {MasonryFlashList} from "@shopify/flash-list";
import {router} from "expo-router";
import {RefreshControl, TouchableOpacity, View} from "react-native";

const ESTIMATED_ITEM_SIZE = 50;
const COLUMNS = 2;

type ItemProps = {
    item: Category;
    index: number;
};

const HomeScreen = () => {
    const {text, background, accent} = theme();
    const {categories, loading, error, toggleFavoriteCategory, refresh} =
        useCategories();

    const skip = () =>
        router.push(
            PATHS.WEB(
                "https://www.linkedin.com/in/binni-cordova-a77000175",
                "Binni Cordova"
            )
        );

    const emptyList: React.FC = () => (
        <Text type={error ? "error" : "default"} style={styles.informationText}>
            {error || (loading ? STRINGS.loading : STRINGS.empty)}
        </Text>
    );

    const header: React.FC = () => (
        <>
            <AppBar
                title=""
                actions={() => (
                    <TouchableOpacity onPress={skip}>
                        <Text type="label">
                            Skip
                            <Icon
                                name="chevron-double-right"
                                size={FONT_SIZE[3]}
                            />
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.body}>
                <Text type="title">{STRINGS.home.title}</Text>
                <Text type="label">{STRINGS.home.subtitle}</Text>
            </View>
            <View style={styles.body}>
                <Text type="subtitle" style={styles.headList}>
                    {STRINGS.home.message}
                </Text>
            </View>
        </>
    );

    const renderItem = ({item, index}: ItemProps) => {
        const backgroundColor = item.isFavorite ? accent : background;
        const color = item.isFavorite ? background : text;
        return (
            <TouchableOpacity
                onPress={() => toggleFavoriteCategory(item)}
                style={[
                    styles.masonryCard,
                    {backgroundColor, borderColor: color},
                ]}
            >
                <Icon name={item.icon} size={FONT_SIZE[10]} color={color} />
                <Text type="label" key={index} style={{color}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const footer: React.FC = () => (
        <View style={styles.body}>
            <Text type="caption">{STRINGS.home.conditions}</Text>
            <Button title={STRINGS.home.action} onPress={skip} />
        </View>
    );

    return (
        <MasonryFlashList
            refreshing={loading}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    title={STRINGS.loading}
                    tintColor={text}
                    titleColor={text}
                    progressBackgroundColor={background}
                    onRefresh={refresh}
                />
            }
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item: Category) => item.name}
            numColumns={COLUMNS}
            estimatedItemSize={ESTIMATED_ITEM_SIZE}
            ListHeaderComponent={header}
            ListEmptyComponent={emptyList}
            ListFooterComponent={footer}
        />
    );
};

export default HomeScreen;
