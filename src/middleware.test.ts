import {NextRequest, NextResponse} from 'next/server';
import * as middleware from "./middleware";
import {fallbackLng} from "@app/i18n/settings";
import {ACCEPT_LANGUAGE_HEADER, COOKIE_NAME, REFERER_HEADER} from "./middleware";
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";


const redirectSpy = jest.spyOn(NextResponse, 'redirect');
const BASE_URL = 'http://localhost/';

describe('middleware', () => {
    const redirectSpy = jest.spyOn(NextResponse, 'redirect');

    afterEach(() => {
        redirectSpy.mockReset();
    });

    it('should redirect to the fallbackLanguage if root URL is called if no cookie is set', () => {
        // Arrange
        const language = 'en';
        const req = new NextRequest(BASE_URL);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(new URL(BASE_URL + fallbackLng));
    });

    it('should redirect to the language specified in ACCEPT_LANGUAGE_HEADER, if it is supported and no COOKIE is set', () => {
        // Arrange
        const language = 'en';
        const req = new NextRequest(BASE_URL);

        req.headers.set(ACCEPT_LANGUAGE_HEADER, language);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(new URL(BASE_URL + language));
    });

    it('should redirect to the fallback Language, if language specified in ACCEPT_LANGUAGE_HEADER is not supported and no COOKIE is set', () => {
        // Arrange
        const language = 'fr';
        const req = new NextRequest(BASE_URL);

        req.headers.set(ACCEPT_LANGUAGE_HEADER, language);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(new URL(BASE_URL + fallbackLng));
    });

    it('should set a Cookie not redirect, if a language specified in REFERER_HEADER that is supported and no COOKIE is set', () => {
        // Arrange
        const refererURL = 'http://localhost/en';
        const req = new NextRequest(BASE_URL + 'de');

        req.headers.set(REFERER_HEADER, refererURL);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(0);
        expect(result.status).toBe(200);
        expect(result.statusText).toBe('OK');

        const responseCookie: ResponseCookie | undefined = result.cookies.get(COOKIE_NAME);

        expect(responseCookie?.value).toBe('en');
    });

    it('should not set a Cookie and not redirect, if a language specified in REFERER_HEADER that is not supported and no COOKIE is set', () => {
        // Arrange
        const refererURL = 'http://localhost/fr';
        const req = new NextRequest(BASE_URL + 'de');

        req.headers.set(REFERER_HEADER, refererURL);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(0);
        expect(result.status).toBe(200);
        expect(result.statusText).toBe('OK');

        const responseCookie: ResponseCookie | undefined = result.cookies.get(COOKIE_NAME);

        expect(responseCookie).toBeUndefined();
    });

    it('should redirect to cookie language, if language is supported and no language path is given', () => {
        // Arrange
        const language = 'en';
        const req = new NextRequest(BASE_URL);

        // set personal
        req.cookies.set(COOKIE_NAME, language);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(new URL(BASE_URL + language));
    });

    it('should redirect to fallback language, if preferred language in Cookie is unsupported, no language path is given and no ACCEPT_LANGUAGE Header is set', () => {
        // Arrange
        const unsupportedLanguage = 'jp';
        const req = new NextRequest(BASE_URL);

        // set personal
        req.cookies.set(COOKIE_NAME, unsupportedLanguage);

        // Act
        const result = middleware.middleware(req);

        // Assert
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(new URL(BASE_URL + fallbackLng));
    });

});