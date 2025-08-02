import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import {View} from "react-native";
import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {SPACING} from "@/theme/spacing";
import {Icon} from "./Icon";

const meta = {
    title: "Icon",
    component: Icon,
    args: {
        name: "home",
        size: FONT_SIZE[3],
        color: theme().text,
    },
    decorators: [
        (Story) => (
            <View
                style={{
                    padding: SPACING[4],
                    backgroundColor: theme().background,
                }}
            >
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onPress: action("onPress"),
    },
};
