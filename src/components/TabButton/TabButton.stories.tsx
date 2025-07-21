import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import {View} from "react-native";
import {SPACING} from "@/theme/spacing";
import {TabButton} from "./TabButton";

const meta = {
    title: "TabButton",
    component: TabButton,
    args: {
        icon: "home",
        isFocused: false,
    },
    decorators: [
        (Story) => (
            <View style={{padding: SPACING[4]}}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof TabButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onPress: action("onPress"),
        children: "icon-home",
    },
};

export const Focused: Story = {
    args: {
        isFocused: true,
        onPress: action("onPress"),
        children: "icon-home",
    },
};

export const WithIcon: Story = {
    args: {
        icon: "home",
        isFocused: false,
        onPress: action("onPress"),
        children: "icon-home",
    },
};
