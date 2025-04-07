import {render} from "@testing-library/react-native";
import {TabButton} from "./TabButton";

const ICON_ID = 1;

jest.mock("@expo/vector-icons", () => ({
    MaterialCommunityIcons: {
        glyphMap: {home: ICON_ID},
    },
    createIconSet: jest.fn(() => "MaterialIconMock"),
}));

describe("TabButton", () => {
    it("renders correctly when not focused", () => {
        const ICON = "home";
        const TEXT = "icon-home";

        const {getByText, getByTestId} = render(
            <TabButton icon={ICON} isFocused={false}>
                {TEXT}
            </TabButton>
        );

        const icon = getByTestId(ICON);
        const text = getByText(TEXT);

        expect(icon).toBeTruthy();
        expect(text).toBeTruthy();
    });
});
