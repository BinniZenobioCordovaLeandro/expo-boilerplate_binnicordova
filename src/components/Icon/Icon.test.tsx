import {render} from "@testing-library/react-native";
import {Icon} from "./Icon";

const ICON_ID = 1;

jest.mock("@expo/vector-icons", () => ({
    MaterialCommunityIcons: {
        glyphMap: {home: ICON_ID},
    },
    createIconSet: jest.fn(() => "MaterialIconMock"),
}));

describe("Icon Component", () => {
    it("renders correctly with default props", () => {
        const ICON_NAME = "home";
        const ICON_TEST_ID = "icon_home";

        const {getByTestId} = render(
            <Icon name={ICON_NAME} testID={ICON_TEST_ID} />
        );
        const icon = getByTestId(ICON_TEST_ID);
        expect(icon).toBeTruthy();
    });
});
