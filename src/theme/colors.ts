type ThemeType = "light" | "dark";

type ColorScheme = {
    background: string;
    text: string;
    accent: string;
    error: string;
    lightness: string;
    darkness: string;
};

const Colors: Record<ThemeType, ColorScheme> = {
    light: {
        background: "#fffaf3",
        text: "#1e1e1e",
        accent: "#ff7a00",
        error: "#d32f2f",
        lightness: "#ffe3c9",
        darkness: "#004d4d",
    },
    dark: {
        background: "#1a1a1a",
        text: "#f0f0f0",
        accent: "#ff9500",
        error: "#ef5350",
        lightness: "#3366cc",
        darkness: "#009e60",
    },
};

export const theme = (theme?: ThemeType): ColorScheme => {
    return Colors[theme || "light"];
};
