import {createInstance, i18n} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {getOptions} from './settings';

/**
 * Initializes i18next instance
 *
 * @param {string} lng - The language to initialize i18next with
 * @param {string} ns - The namespace to initialize i18next with
 * @returns {Promise<i18n>} - A promise that resolves to the i18next instance
 */
const initI18next = async (lng: string, ns: string): Promise<i18n> => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) =>
            import(`../../../public/locales/${language}/${namespace}.json`)))
        .init(getOptions({lng, ns}));

    return i18nInstance;
};

/**
 * Retrieves an instance of the i18next library for the specified language and namespace.
 *
 * @param {string} lng - The language to use for translation.
 * @param {string} ns - The namespace to use for translation.
 * @returns {Promise<i18n>} - A Promise that resolves to the i18next instance.
 */
const _getI18nextInstance = async (lng: string, ns: string): Promise<i18n> => {
    return await initI18next(lng, ns);
};

/**
 * Represents an option type with an optional key prefix.
 *
 * @interface OptionType
 * @property {string} [keyPrefix] - The optional key prefix for the option type.
 */
interface OptionType {
    keyPrefix?: string;
}

/**
 * Retrieves the translation functions and the i18n instance for the specified language and namespace.
 *
 * @param {string} lng - The language code.
 * @param {string} ns - The namespace or an array of namespaces.
 * @param {OptionType} options - The options for translation.
 * @returns {Promise<{ t: Function, i18n: i18n }>} - An object containing the translation function and the i18n instance.
 */
export async function useTranslation(lng: string, ns: string, options: OptionType = {}):
    Promise<{ t: Function; i18n: i18n; }> {
    const i18nextInstance = await _getI18nextInstance(lng, ns);
    const namespace = Array.isArray(ns) ? ns[0] : ns; // Extracted variable

    return {
        t: i18nextInstance.getFixedT(lng, namespace, options.keyPrefix),
        i18n: i18nextInstance,
    };
}