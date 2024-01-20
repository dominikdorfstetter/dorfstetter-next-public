const HEADERS = {
  Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN}`,
};

/**
 * HTTP_OPTIONS_FORCE_CACHE is a variable of type RequestInit that defines options for an HTTP request with force cache policy.
 *
 * @type {RequestInit}
 *
 * @property {string} cache - Specifies the cache policy to 'force-cache'.
 * @property {Headers} headers - Specifies the headers for the request.
 */
export const HTTP_OPTIONS_FORCE_CACHE: RequestInit = {
  cache: "force-cache",
  headers: HEADERS,
};

/**
 * HTTP_OPTIONS_CACHE_RELOAD is a variable used to define the options for an HTTP request with the 'reload' cache mode.
 *
 * @type {RequestInit}
 *
 * @property {string} cache - The cache mode to use for the request. Set to 'reload' to bypass the cache and force a fresh request.
 * @property {Headers} headers - The headers to include in the request.
 */
export const HTTP_OPTIONS_CACHE_RELOAD: RequestInit = {
  cache: "reload",
  headers: HEADERS,
};

/**
 * HTTP_OPTIONS_NO_CACHE - A constant variable representing the request options for a no-cache HTTP request.
 *
 * @type {RequestInit}
 * @property {string} cache - Specifies the caching option for the request. Value is set to 'no-cache'.
 * @property {Headers} headers - Specifies the headers for the request. Value is set to HEADERS.
 */
export const HTTP_OPTIONS_NO_CACHE: RequestInit = {
  cache: "no-cache",
  headers: HEADERS,
};
