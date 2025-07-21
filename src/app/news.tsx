import {FlashList} from "@shopify/flash-list";
import {router} from "expo-router";
import {useAtomValue, useSetAtom} from "jotai";
import {RefreshControl, TouchableOpacity, View} from "react-native";
import {Text} from "@/components/Text/Text";
import {PATHS} from "@/constants/routes";
import {STRINGS} from "@/constants/strings";
import type {Article} from "@/models/article";
import {
    articlesAtom,
    articlesErrorAtom,
    articlesLoadingAtom,
    fetchArticlesAtom,
} from "@/stores/articlesStore";
import {styles} from "@/styles";
import {theme} from "@/theme/colors";

export default function NewsScreen() {
    const {text, background} = theme();

    const articles = useAtomValue(articlesAtom);
    const loading = useAtomValue(articlesLoadingAtom);
    const error = useAtomValue(articlesErrorAtom);
    const fetchArticles = useSetAtom(fetchArticlesAtom);

    const renderItem = ({item}: {item: Article}) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
                router.push(PATHS.WEB(item.story_url, item.story_title))
            }
        >
            <Text type="link" numberOfLines={2}>
                {item.story_title}
            </Text>

            {item.comment_text && (
                <Text type="default" numberOfLines={2}>
                    {item.comment_text.replace(/<[^>]*>/g, "")}
                </Text>
            )}

            <View style={styles.metaContainer}>
                <Text type="caption">
                    By <Text type="label">{item.author}</Text>
                </Text>
                <Text type="caption">
                    {item.created_at.toLocaleLowerCase()}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const emptyList: React.FC = () => (
        <Text type={error ? "error" : "default"} style={styles.informationText}>
            {error || (loading ? STRINGS.loading : STRINGS.empty)}
        </Text>
    );

    return (
        <FlashList
            refreshing={loading}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    title={STRINGS.loading}
                    tintColor={text}
                    titleColor={text}
                    progressBackgroundColor={background}
                    onRefresh={fetchArticles}
                />
            }
            data={articles}
            renderItem={renderItem}
            estimatedItemSize={120}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.objectID}
            contentContainerStyle={styles.safeArea}
            ListEmptyComponent={emptyList}
            style={styles.body}
        />
    );
}
