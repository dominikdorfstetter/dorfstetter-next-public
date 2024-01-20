import React from "react";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import ContentPageElement, {
  Content,
} from "@app/[lng]/components/shared/content.element";
import styles from "./page.module.scss";
import { Metadata } from "next";
import { HTTP_OPTIONS_CACHE_RELOAD } from "@app/http.headers";
import {
  Keyword,
  LocalizationData,
  PageAPIResponse,
  PageContent,
  PageData,
} from "@app/[lng]/page/[route]/index";
import { fetchData } from "@app/utilities";

/**
 * Retrieves a page by its ID from the Strapi API.
 *
 * @param {number} id - The ID of the page to retrieve.
 * @returns {Promise<PageData>} - A Promise that resolves to the retrieved page data or an empty object if no data is available.
 */
async function getPageById(id: number): Promise<PageData> {
  const baseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pages/${id}`;
  const populate: string = "populate=pageContent,pageContent.keywords";
  const apiURL = `${baseURL}?${populate}`;

  try {
    return await fetchData<PageData>(apiURL, HTTP_OPTIONS_CACHE_RELOAD);
  } catch (e) {
    throw new Error("Error while retrieving page data.");
  }
}

/**
 * Retrieves a page from the API based on the given language and route.
 *
 * @param {string} lng - The language of the page to retrieve.
 * @param {string} route - The route of the page to retrieve.
 * @return {Promise<PageAPIResponse>} A Promise that resolves to the page data.
 */
async function getPage(lng: string, route: string): Promise<PageData> {
  const baseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pages`;
  const populate: string =
    "populate=pageContent,pageContent.context,localizations";
  const filterRoute: string = `filters[pageContent][route][$eq]=${route}`;
  const filterContext: string = `filters[pageContent][context][title][$eq]=${process.env.NEXT_PUBLIC_PAGE_CONTEXT}`;
  const apiURL = `${baseURL}/?${populate}&${filterRoute}&${filterContext}`;

  try {
    // Get the page data.
    const pageData: PageData[] = await fetchData<PageData[]>(
      apiURL,
      HTTP_OPTIONS_CACHE_RELOAD,
    );

    // Get the page ID
    const currentPage = pageData[0];
    let pageId = currentPage.id;
    const page = currentPage.attributes;

    // If the current language is the default language, return the page.
    if (page.locale === lng) return currentPage;

    // Get the localizations.
    const localizations: LocalizationData[] =
      currentPage?.attributes?.localizations?.data ?? [];

    // If there are localizations, check if the current language is available.
    if (localizations.length > 0) {
      // If the current language is available, use the page ID of the current language.
      localizations.forEach((localization) => {
        if (localization.attributes.locale === lng) {
          pageId = localization.id;
        }
      });
    } else {
      // If there are no localizations, return the page.
      return currentPage;
    }

    // If no localization is available, use the page ID of the default language & return the page.
    if (pageId === currentPage.id) return currentPage;

    return await getPageById(pageId);
  } catch (error) {
    throw new Error("Error while retrieving page data.");
  }
}

/**
 * Renders a common page with requested parameters.
 *
 * @param params - The parameters for the page.
 * @param params.lng - The language for the page.
 * @param params.route - The route for the page.
 * @returns {React.JSX.Element} The JSX element representing the common page.
 */
async function CommonPage({
  params,
}: Readonly<{
  params: {
    lng: string;
    route: string;
  };
}>): Promise<React.JSX.Element> {
  const { lng, route } = params;
  let content: Content[] = [];

  try {
    const pageData: PageData = await getPage(lng, route);
    const page: PageContent = pageData.attributes.pageContent;
    content = page?.content || [];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className={`page_wrapper`}>
      <ContentPageElement
        content={content}
        context={`page`}
        translation={{ copy2success: "", copy2text: "" }}
      ></ContentPageElement>
    </div>
  );
}

/**
 * Generates metadata for a specific page.
 *
 * @param {Object} params - The parameters for generating metadata.
 * @param {string} params.lng - The language of the page.
 * @param {string} params.route - The route of the page.
 * @return {Promise<Metadata>} - The generated metadata.
 */
export async function generateMetadata({
  params: { lng, route },
}: {
  params: {
    lng: string;
    route: string;
  };
}): Promise<Metadata> {
  const pageData: PageData = await getPage(lng, route);
  const page: PageContent = pageData.attributes.pageContent;
  const { t } = await serverSideTranslation(lng, "common");
  const { title, keywords } = page;
  const keywordsCleaned: string[] =
    keywords?.map((keyword: Keyword) => keyword.keyword) ?? [];
  const metaTitle = `${t("meta-common-page-title-prefix")} ${title} ${t("meta-common-page-title-suffix")}`;

  return {
    title: metaTitle,
    applicationName: t("meta-site-name"),
    keywords: keywordsCleaned,
    creator: t("meta-author"),
    authors: [
      {
        name: t("meta-author"),
      },
    ],
    description: t("meta-description"),
    openGraph: {
      title: metaTitle,
      description: t("meta-description"),
      type: "website",
      locale: lng,
      siteName: t("meta-site-name"),
    },
  };
}

export default CommonPage;
