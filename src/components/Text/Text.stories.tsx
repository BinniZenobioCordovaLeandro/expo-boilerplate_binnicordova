import {SPACING} from "@/theme/spacing";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {View} from "react-native";
import {Text} from "./Text";

const meta = {
    title: "Text",
    component: Text,
    args: {
        children: "Hello World",
        type: "default",
    },
    decorators: [
        (Story) => (
            <View style={{padding: SPACING[4]}}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onPress: action("onPress"),
    },
};
