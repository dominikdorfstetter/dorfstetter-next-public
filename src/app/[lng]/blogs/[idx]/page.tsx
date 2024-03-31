import React from "react";
import { Pagination } from "./pagination";
import { redirect } from "next/navigation";
import { BlogPageElement } from "@app/[lng]/blogs/[idx]/blog.element";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import styles from "./blogs.module.scss";
import { HTTP_OPTIONS_CACHE_RELOAD } from "@app/http.headers";
import { BlogData, BlogsAPIResponse } from "@app/[lng]/blogs/[idx]/index";
import BreadcrumbsElement, {
  BreadCrumbsElement,
} from "@app/[lng]/components/shared/breadcrumbs.element";

/**
 * Retrieves a list of blogs based on the specified locale and start page.
 *
 * @param {string} locale - The locale for which to retrieve blogs.
 * @param {number} startPage - The start page for pagination.
 * @returns {Promise<BlogsAPIResponse>} - A Promise that resolves to the API response containing the list of blogs.
 */
async function getBlogs(
  locale: string,
  startPage: number,
): Promise<BlogsAPIResponse> {
  const baseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs`;
  const fields: string =
    "fields[0]=id&fields[1]=title&fields[2]=author&fields[3]=date&fields[4]=teaserText";
  const populate: string = "populate=coverimage";
  const sort: string = "sort=date:desc";
  const pageSize: string = "pagination[pageSize]=4";
  const paginationStart: string = `pagination[page]=${startPage}`;
  const apiURL: string = `${baseURL}?${fields}&${populate}&locale=${locale}&${pageSize}&${paginationStart}&${sort}`;
  const res: Response = await fetch(apiURL, HTTP_OPTIONS_CACHE_RELOAD);
  const data: BlogsAPIResponse = await res.json();

  return data || {};
}

/**
 * Renders the Blogs page.
 *
 * @param {Object} params - The parameters needed to render the Blogs page.
 * @param {string} params.lng - The language of the page.
 * @param {number} params.idx - The index of the page.
 * @return {Promise<React.JSX.Element>} - A Promise resolving to the JSX element representing the Blogs page.
 */
export default async function BlogsPage({
  params,
}: Readonly<{
  params: {
    lng: string;
    idx: number;
  };
}>): Promise<React.JSX.Element> {
  const lng = params?.lng || "en";
  const blogResponse: BlogsAPIResponse = await getBlogs(lng, params?.idx);
  const blogs: BlogData[] = blogResponse?.data;
  const { t } = await serverSideTranslation(lng, "blogs");
  const crumbs: BreadCrumbsElement[] = [
    {
      icon: "home",
      title: t("home"),
      url: "/" + lng,
    },
  ];
  const currentBreadcrumb: BreadCrumbsElement = {
    title: t("crumbs-headline"),
  };

  // redirect to first page if page returned has no elements
  if (!blogs || blogs?.length === 0) {
    redirect(`/${lng}/blogs`);
  }

  const pageCount: number = blogResponse.meta?.pagination.pageCount;
  const currentPage: number = blogResponse.meta?.pagination.page;
  const showPagination: boolean = pageCount > 1;

  return (
    <div className={styles.blogspage}>
      <BreadcrumbsElement crumbs={crumbs} current={currentBreadcrumb} />
      {showPagination ? (
        <h1>
          {t("headline")} - {t("site")} {currentPage}
        </h1>
      ) : (
        <h1>{t("headline")}</h1>
      )}
      {showPagination && (
        <Pagination
          lng={lng}
          route={`blogs`}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      )}
      <br />
      <div className={styles.blogcards_wrapper}>
        {blogs?.map((blog: BlogData) => {
          return <BlogPageElement key={blog.id} blog={blog} lng={lng} />;
        })}
      </div>
      <br />
      {showPagination && (
        <Pagination
          lng={lng}
          route={`blogs`}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      )}
    </div>
  );
}
