/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon, { IconType, AriaRole } from "./icon";

describe('Icon Component', () => {
    it("Should render with role='presentation'", () => {
        const { container } = render(
            <Icon
                params={{
                    type: 'arrow_back',
                    aria_role: 'presentation',
                    icon_text: '',
                }}
            />
        );
        expect(container.firstChild).toHaveClass("icon_svg icon_arrow_back");
        expect(container.firstChild).toHaveAttribute("role", "presentation");
    });

    it("Should render with role='img'", () => {
        const { container } = render(
            <Icon
                params={{
                    type: 'arrow_back',
                    aria_role: 'img',
                    icon_text: 'backward',
                }}
            />
        );
        expect(container.firstChild).toHaveClass("icon_svg icon_arrow_back");
        expect(container.firstChild).toHaveAttribute("role", "img");
        expect(container.firstChild).toHaveAttribute("aria-label", "backward");
    });
});