"use client";
import React from "react";

export type IconType =
  | "arrow_back"
  | "arrow_forward"
  | "menu"
  | "person"
  | "download"
  | "event"
  | "home"
  | "save"
  | "link"
  | "close"
  | "mail"
  | "share"
  | "month"
  | "external"
  | "work"
  | "location";
export type AriaRole = "presentation" | "img";

export type IconProps = {
  type: IconType;
  aria_role: AriaRole;
  icon_text: string;
  hoverEffect?: boolean;
};

/**
 * Renders an SVG icon based on the provided parameters.
 *
 * @param {Object} params - The parameters for the icon.
 * @param {IconType} params.type - The type of icon to render.
 * @param {AriaRole} params.aria_role - The ARIA role for the icon element.
 * @param {string} params.icon_text - The accessible text for the icon element.
 * @returns {React.JSX.Element} - The rendered icon element.
 */
function Icon({
  params: { type, aria_role, icon_text, hoverEffect = false },
}: Readonly<{
  params: IconProps;
}>): React.JSX.Element {
  return (
    <>
      {aria_role === "presentation" && (
        <div
          className={`icon_svg icon_${type} ${hoverEffect && "icon_hover__effect"}`}
          role={aria_role}
        />
      )}
      {aria_role === "img" && (
        <div
          className={`icon_svg icon_${type} ${hoverEffect && "icon_hover__effect"}`}
          role={aria_role}
          aria-label={icon_text}
        />
      )}
    </>
  );
}

export default Icon;
