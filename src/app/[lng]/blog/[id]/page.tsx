import React from "react";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import ContentPageElement from "@app/[lng]/components/shared/content.element";
import styles from "./blog.module.scss";
import Icon from "@app/[lng]/components/icon";
import Image from "next/image";
import ShareButton from "@app/[lng]/components/sharebutton.element";
import AttachmentsList from "./attachmentslist";
import LinksList from "./linklist";
import { Metadata } from "next";
import { HTTP_OPTIONS_CACHE_RELOAD } from "@app/http.headers";
import {
  AttachmentData,
  Blog,
  BlogPageAPIResponse,
  Content,
  IconProps,
  Keyword,
  LanguageProps,
  TranslationProps,
  LinkData,
} from "@app/[lng]/blog/[id]/index";

/**
 * Fetch an API resource and converts it to JSON
 *
 * If you are using a library such as axios, this function would not be needed as JSON conversion is done automatically
 *
 * @param {string} url - The url of the resource to retrieve
 * @param {RequestInit} options - The fetch options
 *
 * @returns {Promise<object>} - A Promise that resolves with the JSON data or throws an error
 */
async function fetchJson(url: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`HTTP error ${response.status}`);
  }
}

const BASE_API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs`;
const POPULATE_QUERY_PARAM =
  "populate=coverimage,attachments,photos,links,keywords";

/**
 * Retrieves a blog post from the server based on the specified blogId.
 *
 * @param {number} blogId - The ID of the blog post to retrieve.
 *
 * @returns {Promise<BlogPageAPIResponse>} A Promise that resolves with the blog post data or an empty object if no data is available.
 */
async function getBlog(blogId: number): Promise<BlogPageAPIResponse> {
  const apiURL = `${BASE_API_URL}/${blogId}?${POPULATE_QUERY_PARAM}`;
  const data = await fetchJson(apiURL, HTTP_OPTIONS_CACHE_RELOAD);
  return data || {};
}

/**
 * Renders a blog page with the given parameters.
 *
 * @param {{params: {lng: string, id: number}}} params - The parameters for the blog page.
 *
 * @return {Promise<React.JSX.Element>} - The rendered blog page.
 */
async function BlogPage({
  params,
}: Readonly<{
  params: {
    lng: string;
    id: number;
  };
}>): Promise<React.JSX.Element> {
  const { lng, id } = params;
  const blogResponse: BlogPageAPIResponse = await getBlog(id);
  const { t } = await serverSideTranslation(lng, "blogs");
  const commonT: LanguageProps = await serverSideTranslation(lng, "common");
  const iconTranslation: LanguageProps = await serverSideTranslation(
    lng,
    "icons",
  );
  const blog: Blog = blogResponse?.data?.attributes;
  const content: Content[] = blog?.content || [];

  const commonTranslation: TranslationProps = {
    copy2text: commonT.t("copy2clipboard"),
    copy2success: commonT.t("copy2clipboard-success"),
  };

  const iconPerson: IconProps = {
    type: "person",
    icon_text: iconTranslation.t("person"),
    aria_role: "presentation",
  };

  const iconEvent: IconProps = {
    type: "event",
    icon_text: iconTranslation.t("event"),
    aria_role: "presentation",
  };

  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";
  const attachments: AttachmentData[] = blog?.attachments?.data || [];
  const links: LinkData[] = blog?.links || [];

  return (
    <div className={styles.blogpage}>
      <div className={styles.cover_container}>
        <Image
          className={styles.coverimage}
          src={blog?.coverimage?.data?.attributes?.formats?.large?.url}
          alt={`coverimage ${blog?.coverimage?.data?.attributes?.name}`}
          width={1400}
          height={600}
        />
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.title}>
          {blog?.title}
          <ShareButton
            lng={lng}
            url={hostname}
            title={blog?.title}
          ></ShareButton>
        </div>
        <div className={styles.flex_wrapper}>
          <div className={styles.flex_inline}>
            <Icon params={iconPerson} />
            <div className={styles.meta_text}>{blog?.author}</div>
          </div>
          <div className={styles.flex_inline}>
            <Icon params={iconEvent} />
            <div className={styles.meta_text}>{blog?.date}</div>
          </div>
        </div>
        <ContentPageElement
          content={content}
          context={`blog`}
          translation={commonTranslation}
        ></ContentPageElement>

        <div className={styles.flex_wrapper}>
          {attachments.length > 0 ? (
            <AttachmentsList lng={lng} attachments={attachments} />
          ) : (
            <></>
          )}
        </div>

        <div className={styles.flex_wrapper}>
          {links.length > 0 ? <LinksList lng={lng} links={links} /> : <></>}
        </div>
      </div>
    </div>
  );
}

/**
 * This function builds the site metadata for the blog page.
 *
 * @param lng Language
 * @param id Blog ID
 */
export async function generateMetadata({
  params: { lng, id },
}: Readonly<{
  params: {
    lng: string;
    id: number;
  };
}>): Promise<Metadata> {
  const blog = await getBlog(id);
  const { title, author, teaserText, keywords } = blog?.data?.attributes;
  const keywordsCleaned: string[] = keywords.map(
    (keyword: Keyword) => keyword.keyword,
  );
  const { t } = await serverSideTranslation(lng, "common");

  return {
    title: `Blog > ${title} ${t("meta-common-page-title-suffix")}`,
    description: teaserText,
    twitter: {
      title: `Blog > ${title} ${t("meta-common-page-title-suffix")}`,
      description: teaserText,
      images: [
        blog.data.attributes.coverimage.data.attributes.formats.medium.url,
      ],
    },
    creator: author,
    authors: [
      {
        name: author,
      },
    ],
    keywords: keywordsCleaned,
    openGraph: {
      title: `Blog > ${title} ${t("meta-common-page-title-suffix")}`,
      description: teaserText,
      type: "article",
      locale: lng,
      images: [
        blog.data.attributes.coverimage.data.attributes.formats.medium.url,
      ],
    },
    robots: "index, follow",
  };
}

export default BlogPage;
