import type {IconProps} from "@/components/Icon/Icon";

export type Category = {
    name: string;
    icon: IconProps["name"];
    isFavorite?: boolean;
};
