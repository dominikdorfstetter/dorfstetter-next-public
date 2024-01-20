import React from "react";
import Link from "next/link";
import styles from './page.module.scss';
import Image from "next/image";
import {HTTP_OPTIONS_FORCE_CACHE} from "@app/http.headers";
import {Section, StartPageAPIResponse, StartPageAttributes} from "@app/[lng]/index";

/**
 * Retrieves landing page data for the specified locale.
 *
 * @param {string} locale - The locale to retrieve landing page data for.
 * @returns {Promise<StartPageAttributes>} - A promise that resolves with the landing page data.
 */
const getLandingPageData = async (locale: string): Promise<StartPageAttributes> => {
    // Construct the URL parameters.
    const urlParams: URLSearchParams = new URLSearchParams({
        populate: 'photo,sections,sections.coverimage',
        locale: locale
    });

    // Construct the API URL.
    const apiURL = new URL(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/landing-page`);

    // Attach the parameters to the URL.
    apiURL.search = urlParams.toString();

    const res: Response = await fetch(apiURL.toString(), HTTP_OPTIONS_FORCE_CACHE);

    const data: StartPageAPIResponse = await res.json();

    return data?.data?.attributes || {};
}

/**
 * Returns a string containing the names of the given classes separated by a space.
 *
 * @param {...string} classes - The names of the classes to be concatenated.
 * @return {string} - A string containing the names of the classes separated by a space.
 */
function getClassName(...classes: string[]): string  {
    return classes.join(' ');
}

/**
 * Generates the home page component.
 *
 * @param {Object} params - The parameters for the home page.
 * @param {string} params.lng - The language for the home page.
 *
 * @returns {Promise<React.JSX.Element>} - The home page component.
 */
async function Home({params}: Readonly<{
    params: {
        lng: string;
    }
}>): Promise<React.JSX.Element> {
    const landingPageData: StartPageAttributes = await getLandingPageData(params.lng);
    const {title, introduction, sections, photo} = landingPageData || {};

    const headlineClasses = getClassName(styles.gradient_heading, styles.gradient_font, styles.hero_headline);
    return (
        <main className={`${styles.main} ${styles.page_wrapper}`}>
            <section className={styles.hero_section} tabIndex={-1}>
                <div className={styles.hero_wrapper__left}>
                    <h1 className={headlineClasses}>{title || ''}</h1>
                    <p className={styles.hero_text}>{introduction || ''}</p>
                </div>
                <div className={styles.hero_picture}>
                    <Image src={`${photo?.data?.attributes?.formats?.medium?.url}`}
                           alt={`${photo?.data?.attributes?.alternativeText || ''}`}
                           placeholder={'blur'}
                           blurDataURL={photo?.data?.attributes?.formats?.thumbnail?.url}
                           title={`${photo?.data?.attributes?.caption || ''}`} width={500} height={500}
                           priority
                    />
                </div>
            </section>
            <div className={styles.page_card_wrapper}>
                {sections?.map((entry: Section) => {
                    return <SectionElement key={entry.id} entry={entry} lng={params.lng}/>;
                })}
            </div>
        </main>
    );
}

export default Home;

/**
 * Builds a link URL by concatenating a language code and a call-to-action route.
 *
 * @param {string} lng - The language code.
 * @param {string} callToActionRoute - The call-to-action route.
 *
 * @return {string} - The built link URL.
 */
function buildLinkUrl(lng: string, callToActionRoute: string): string {
    return `${lng}/${callToActionRoute}`;
}

/**
 * Renders a section element with a title, text, a call-to-action link, and a cover image.
 *
 * @param entry - The section data object.
 * @param lng - The language code.
 * @returns A React JSX element representing the section element.
 */
async function SectionElement({entry, lng}: Readonly<{ entry: Section; lng: string; }>): Promise<React.JSX.Element> {
    const {title, text, callToActionRoute, coverimage} = entry || {};
    const coverImageFormats = coverimage?.data?.attributes?.formats || {};

    return (
        <Link
            href={buildLinkUrl(lng, callToActionRoute)}
            className={`${styles.card_link} ${styles.page_card}`}
            title={title}
        >
            <Image
                className={styles.card_image}
                src={coverImageFormats?.medium?.url}
                alt={coverImageFormats.medium?.name}
                placeholder={'blur'}
                blurDataURL={coverImageFormats?.thumbnail?.url}
                width={350}
                height={350}
                priority
            />
            <div className={styles.card_content}>
                <h2 className={styles.card_title}>{title}</h2>
                <p className={styles.card_text}>{text}</p>
            </div>
        </Link>
    );
}