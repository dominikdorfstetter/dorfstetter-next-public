// importing dependency modules
import { render } from "@testing-library/react";
import PlausibleAnalytics from "./plausible.analytics";

let mockCookie: any = {};
jest.mock("react-cookie", () => ({
  useCookies: () => [mockCookie, undefined],
}));

describe("PlausibleAnalytics", () => {
  // Test case: Verify the condition when legal.analytics.plausible cookie data available
  it("should render PlausibleAnalytics with script tag when isConsentGiven is true", () => {
    const plausibleActive = { legal: { analytics: { plausible: true } } };
    mockCookie = plausibleActive;

    const { container } = render(<PlausibleAnalytics />);

    const script = container.querySelector(
      'script[test-id="plausible-script"]',
    );

    expect(script).not.toBeNull();
    expect(script?.getAttribute("data-domain")).toBe("dorfstetter.at");
    expect(script?.getAttribute("src")).toBe(
      "https://plausible.io/js/script.js",
    );
  });

  // Test case: Verify the condition when legal.analytics.plausible cookie data is not available
  it("should not render script tag when isConsentGiven is false", () => {
    const plausibleNotActive = { legal: { analytics: { plausible: false } } };
    mockCookie = plausibleNotActive;

    const { container } = render(<PlausibleAnalytics />);

    const script = container.querySelector("script");
    expect(script).toBeNull();
  });
});
