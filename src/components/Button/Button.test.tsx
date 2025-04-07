import {render} from "@testing-library/react-native";
import React from "react";
import {Button} from "./Button";

describe("Button Component", () => {
    it("should renders correctly with given title", () => {
        const {getByText} = render(<Button title="Click Me" />);
        expect(getByText("Click Me")).toBeTruthy();
    });
});
