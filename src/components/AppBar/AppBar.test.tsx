import {render} from "@testing-library/react-native";
import React from "react";
import {AppBar} from "./AppBar";

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(() => ({
        canGoBack: jest.fn(() => false),
    })),
}));

const TITLE = "Test Title";

describe("AppBar", () => {
    it("renders the title correctly", () => {
        const {getByText} = render(<AppBar title={TITLE} />);
        expect(getByText(TITLE)).toBeTruthy();
    });
    it("does not render back button when canGoBack is false", () => {
        const {queryByTestId} = render(<AppBar title={TITLE} />);
        expect(queryByTestId("back-button")).toBeNull();
    });
});
