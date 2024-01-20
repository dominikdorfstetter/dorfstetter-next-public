import React from "react";
import {
    LegalAPIResponse,
    LegalData, LegalObject, LegalTranslation, Localization, LocalizationData
} from "@app/[lng]/components/shared/legal/legal.types";
import {HTTP_OPTIONS_FORCE_CACHE} from "@app/http.headers";
import LegalBanner from "@app/[lng]/components/shared/legal/legal.banner";
import {useTranslation as serverSideTranslation} from "@app/i18n";
import {fetchData} from "@app/utilities";

/**
 * Retrieves legal data based on the specified language.
 *
 * @param {string} lng - The desired language for the legal data.
 * @return {Promise<LegalData | undefined>} - A promise that resolves to the legal data in the specified language, if available.
 */
async function getLegalData(lng: string): Promise<LegalData | undefined> {
    const baseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/legals`;
    const populate: string = 'populate=groups,groups.items,localizations';
    const contexts: string = `[contexts][title][$eq]=${process.env.NEXT_PUBLIC_PAGE_CONTEXT}`;
    const apiURL = `${baseURL}?${contexts}&${populate}`;

    try {
        // If the response is not ok, throw an error.
        const apiResponse: LegalObject | LegalObject[] =
            await fetchData<LegalObject | LegalObject[]>(apiURL, HTTP_OPTIONS_FORCE_CACHE);

        // Find the default attributes.
        if (Array.isArray(apiResponse)) {
            // legalAPIResponse.data is an array of LegalObject objects.
            const defaultAttributes: LegalData = apiResponse[0].attributes;

            // If the default attributes are available and the
            // locale matches the specified language, return the default attributes.
            if (defaultAttributes.locale === lng) {
                return defaultAttributes;
            }

            // If the default attributes are not available, throw an error.
            const localizations: LocalizationData = defaultAttributes.localizations;
            if (!localizations) {
                throw new Error('No localizations found.');
            }

            // Find the localized attributes for the specified language.
            const localizedAttributes = localizations?.data?.find(
                (localization: Localization) => localization.attributes.locale === lng
            );

            // If the localized attributes are available, return the localized data.
            if (!localizedAttributes) {
                return defaultAttributes;
            }

            const pageId = localizedAttributes.id;
            const localeURL = `${baseURL}/${pageId}?${populate}`;
            const localeResponse = await fetchData<LegalObject>(localeURL, HTTP_OPTIONS_FORCE_CACHE);
            return localeResponse.attributes ?? defaultAttributes;
        } else {
            throw new Error('Root legal object should contain localizations.');
        }
    } catch (error) {
        console.error('Fetching the API failed: ', error);
        throw error;
    }
}

/**
 * Renders a LegalBanner component with the provided translation and legal data.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.lng - The language code.
 *
 * @returns {Promise<React.JSX.Element>} - A Promise that resolves to a React element representing the LegalBanner component.
 */
async function LegalComponent({params: {lng}}: Readonly<{
    params: {
        lng: string;
    }
}>): Promise<React.JSX.Element> {
    // Fetch the legal data and the translation.
    const [legalData, { t }] = await Promise.all([
        getLegalData(lng),
        serverSideTranslation(lng, 'legal')
    ]);

    // If the legal data is undefined, throw an error.
    if (!legalData) {
        throw new Error('Legal data is undefined');
    }

    // Create the translation object.
    const legalTranslation: LegalTranslation = {
        accept: t('accept'),
        acceptAll: t('accept-all'),
        denyAll: t('deny-all'),
        labelFor: t('label-for'),
        lastUpdated: t('last-updated'),
        close: t('close'),
        save: t('save'),
        userCookie: t('user-cookie')
    };

    // Render the LegalBanner component.
    return (
        <>
            {!legalData ? <div>Error while fetching Legaldata!</div> : <LegalBanner translation={legalTranslation} params={legalData}/>}
        </>
    )
}

export default LegalComponent;