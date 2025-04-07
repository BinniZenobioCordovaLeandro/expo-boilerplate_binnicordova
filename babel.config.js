module.exports = (api) => {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            ["babel-plugin-react-docgen-typescript", {exclude: "node_modules"}],
        ],
    };
};
