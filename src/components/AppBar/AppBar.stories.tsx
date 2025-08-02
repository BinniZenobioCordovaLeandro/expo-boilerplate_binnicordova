import type {Meta, StoryObj} from "@storybook/react";
import {View} from "react-native";
import {AppBar} from "./AppBar";

const meta = {
    title: "AppBar",
    component: AppBar,
    args: {
        title: "AppBar",
    },
    decorators: [
        (Story) => (
            <View style={{padding: 16}}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "AppBar",
    },
};
