import {render} from "@testing-library/react-native";
import React from "react";
import {Text, type ThemedTextProps} from "./Text";

describe("ThemedText", () => {
    const testCases: ThemedTextProps["type"][] = [
        "default",
        "title",
        "caption",
        "error",
        "label",
    ];

    test.each(testCases)("renders with type '%s'", (type) => {
        const text = "Sample Text";
        const {getByText} = render(<Text type={type}>{text}</Text>);
        const textElement = getByText(text);
        expect(textElement).toBeTruthy();
    });

    it("renders with custom styles", () => {
        const customStyle = {fontSize: 20};
        const text = "Custom Style Text";
        const {getByText} = render(<Text style={customStyle}>{text}</Text>);
        const textElement = getByText(text);
        expect(textElement).toBeTruthy();
    });
});
