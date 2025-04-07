import type {Article} from "@/models/article";

export const getArticlesMatchs = (
    articles: Article[],
    categories: string[]
): Article[] => {
    const categoriesRegex = categories.join("|");
    let filteredHits = articles;
    filteredHits = articles.filter((hit) =>
        hit.story_title?.match(new RegExp(categoriesRegex, "i"))
    );
    return filteredHits;
};
