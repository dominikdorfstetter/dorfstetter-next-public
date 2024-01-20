import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@app/i18n/settings";
import { COOKIE_OPTIONS } from "@app/cookies";
import { NextConfig } from "next";

export const ACCEPT_LANGUAGE_HEADER = "Accept-Language";
export const REFERER_HEADER: string = "referer";
export const COOKIE_NAME: string = "i18next";

// set to the languages you support, or [] to disable language detection.
acceptLanguage.languages(languages);

export const config: NextConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon|img|icons|fonts|sw.js|robots.txt|sitemap.xml).*)",
  ],
};

/**
 * Retrieves the locale from a cookie.
 *
 * @param {NextRequest} req - The request object. Must have a `cookies` property.
 *
 * @return {string|null} The locale if found in the cookie, null otherwise.
 */
function getLocaleFromCookie(req: NextRequest): string | null {
  // If the locale cookie is present, try to get the locale from it
  if (req.cookies.has(COOKIE_NAME)) {
    return acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value);
  }

  return null;
}

/**
 * Gets the locale from the request headers.
 *
 * @param {NextRequest} req - The request object.
 *
 * @return {string | null} - The locale or null if not found.
 */
function getLocaleFromHeaders(req: NextRequest): string | null {
  // If the Accept-Language header is present, try to get the locale from it
  if (req.headers.has(ACCEPT_LANGUAGE_HEADER)) {
    return acceptLanguage.get(req.headers.get(ACCEPT_LANGUAGE_HEADER));
  }

  return null;
}

/**
 * Middleware function to handle language localization in requests
 *
 * @param {NextRequest} req - The request object
 * @return {NextResponse} The NextResponse object for the current request
 */
export function middleware(req: NextRequest): NextResponse {
  //FIXME: redirect from root without language in topLevel results in 404
  let language = getLocaleFromCookie(req);

  // If no language was found in the cookie, try to get it from the headers
  if (!language) {
    language = getLocaleFromHeaders(req) ?? fallbackLng;
  }

  const topLevelPath = req.nextUrl.pathname.split("/")[1];

  // If the language is not supported, redirect to the same URL with the default language
  const isUnsupported =
    !languages.some((loc) => topLevelPath === `${loc}`) &&
    !req.nextUrl.pathname.startsWith("/_next");

  // If the language is not supported, redirect to the default language
  if (isUnsupported) {
    return NextResponse.redirect(new URL(`/${language}`, req.url));
  }

  // If the language is supported, set the locale cookie
  if (req.headers.has(REFERER_HEADER)) {
    const refererUrl = new URL(req.headers.get(REFERER_HEADER) ?? "");
    const languageInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();

    // If the referer URL contains a supported language, set the locale cookie
    if (languageInReferer) {
      response.cookies.set(COOKIE_NAME, languageInReferer, COOKIE_OPTIONS);
    }

    return response;
  }

  return NextResponse.next();
}
