export const fallbackLng = 'de';
export const languages = [fallbackLng, 'en', 'es'];
export const defaultNS = 'translation';

interface Options {
    lng: string;
    ns: string;
    debug?: boolean;
    supportedLngs?: string[];
    fallbackLng?: string;
    fallbackNS?: string;
    defaultNS?: string;
}

/**
 * Retrieves the options from the provided object.
 *
 * @param {Options} options - The object containing options.
 * @returns {Options} - The retrieved options object.
 */
export function getOptions(options: Options): Options {
    return {
        debug: options.debug ?? false,
        supportedLngs: options.supportedLngs,
        fallbackLng: options.fallbackLng,
        lng: options.lng,
        fallbackNS: options.fallbackNS,
        defaultNS: options.defaultNS,
        ns: options.ns
    }
}