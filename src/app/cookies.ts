import { CookieSetOptions } from "universal-cookie";
import { CookieSerializeOptions } from "cookie";

/**
 * Variable representing the options for setting or serializing cookies.
 *
 * @type {CookieSetOptions | CookieSerializeOptions}
 *
 * @property {string} [path='/'] - The path for which the cookie is valid.
 * @property {boolean} [secure=true] - Specifies if the cookie can only be sent over secure connections.
 * @property {string} [sameSite='strict'] - Specifies the same-site policy for the cookie.
 * @property {Date} [expires=One year after the current date] - Specifies the expiration date of the cookie.
 */
export const COOKIE_OPTIONS: CookieSetOptions | CookieSerializeOptions = {
  path: "/",
  secure: true,
  sameSite: "strict",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
};
