import { MetadataRoute } from "next";

/**
 * Returns the robots configuration for the website.
 *
 * @returns {MetadataRoute.Robots} The robots configuration containing the user agent rules and sitemap URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dorfstetter.at/sitemap.xml",
  };
}
