import type {StorybookConfig} from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
    stories: [
        "../src/components/**/*.stories.mdx",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
    ],

    framework: {
        name: "@storybook/react-native-web-vite",
        options: {},
    },

    docs: {},

    typescript: {
        reactDocgen: "react-docgen",
    },
};

export default main;
