import React from "react";
import styles from "./cv.module.scss";
import Link from "next/link";
import { HTTP_OPTIONS_FORCE_CACHE } from "@app/http.headers";
import { CV, CVEntry, CVPageProps, Data, Skill } from "@app/[lng]/cv/index";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import { fetchData } from "@app/utilities";
import Icon, { IconProps } from "@app/[lng]/components/icon";
import BreadcrumbsElement, {
  BreadCrumbsElement,
} from "@app/[lng]/components/shared/breadcrumbs.element";

/**
 * Retrieves the CV data from the API based on the given locale.
 *
 * @param {string} locale - The locale language used to retrieve the CV data.
 * @returns {Promise<CV>} - A promise that resolves to the CV data.
 */
const getCV = async (locale: string): Promise<CV> => {
  const populate: string = "populate=cv,cv.skills";
  const apiURL: string = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cv?${populate}&locale=${locale}`;
  const data: Data = await fetchData<Data>(apiURL, HTTP_OPTIONS_FORCE_CACHE);

  if (!data) {
    throw new Error("Error while retrieving CV data.");
  }

  return data?.attributes;
};

/**
 * Renders the CV page with the given parameters.
 *
 * @param {Object} params - The parameters for the CV page.
 * @param {string} params.lng - The language for the CV page.
 * @returns {Promise<React.JSX.Element>} - The Promise resolving to the rendered CV page.
 */
export default async function CVPage({
  params,
}: CVPageProps): Promise<React.JSX.Element> {
  const [cvData, { t }] = await Promise.all([
    getCV(params.lng),
    serverSideTranslation(params.lng, "cv"),
  ]);
  const crumbs: BreadCrumbsElement[] = [
    {
      icon: "home",
      title: "home",
      url: "/" + params.lng,
    },
  ];
  const currentBreadcrumb: BreadCrumbsElement = {
    title: cvData.title,
  };

  return (
    <div className={`page_wrapper`}>
      <BreadcrumbsElement crumbs={crumbs} current={currentBreadcrumb} />
      {cvData && <h1>{cvData.title ?? t("placeholderTitle")}</h1>}
      {cvData && <p>{cvData.introduction ?? t("placeholderIntro")}</p>}
      {cvData && (
        <div className={styles.cv_list}>
          {cvData?.cv?.map((entry: CVEntry) => {
            return <CVEntryElement key={entry.id} cvEntry={entry} t={t} />;
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Formats a given date in the format "DD.MM.YYYY".
 *
 * @param {Date|null} date - The date to be formatted.
 * @returns {string|null} - The formatted date or null if the input date is null.
 */
const getFormattedDate = (date: Date | null): string | null => {
  if (!date) return null;

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  return `${day}.${month}.${date.getFullYear()}`;
};

/**
 * Creates a CV entry element.
 *
 * @param {Object} cvEntry - The CV entry object.
 * @param {Function} t - The translation function.
 * @returns {React.JSX.Element} - The CV entry component.
 */
function CVEntryElement({
  cvEntry,
  t,
}: Readonly<{ cvEntry: CVEntry; t: Function }>): React.JSX.Element {
  const skillsExistOnEntry =
    (cvEntry && cvEntry.skills && cvEntry.skills.length > 0) ?? false;
  const fromDate: Date | null = cvEntry.from ? new Date(cvEntry.from) : null;
  const toDate: Date | null = cvEntry.to ? new Date(cvEntry.to) : null;
  const iconWork: IconProps = {
    type: "work",
    icon_text: t("") ?? "",
    aria_role: "presentation",
  };
  const iconMonth: IconProps = {
    type: "month",
    icon_text: t("") ?? "",
    aria_role: "presentation",
  };
  const iconLocation: IconProps = {
    type: "location",
    icon_text: t("") ?? "",
    aria_role: "presentation",
  };
  const iconExternal: IconProps = {
    type: "external",
    icon_text: t("") ?? "",
    aria_role: "presentation",
    hoverEffect: true,
  };

  return (
    <div className={styles.card}>
      {cvEntry && (
        <h2 className={styles.cv_position}>
          {cvEntry?.position ?? t("placeholderPosition")}
        </h2>
      )}
      {cvEntry && (
        <div className={`${styles.inline_flex}`}>
          <Icon params={iconWork} />
          <div className={styles.cv_company}>
            {cvEntry?.company ?? t("placeholderCompany")}
          </div>
          {cvEntry?.url && (
            <Link href={cvEntry?.url ?? t("placeholderURL")} target={`_blank`}>
              <Icon params={iconExternal} />
            </Link>
          )}
        </div>
      )}
      {cvEntry && (
        <div className={`${styles.cv_location}, ${styles.inline_flex}`}>
          <Icon params={iconLocation} />
          {cvEntry.location ?? t("placeholderLocation")}
        </div>
      )}
      {cvEntry && (
        <div className={`${styles.cv_range}, ${styles.inline_flex}`}>
          <Icon params={iconMonth} />
          {getFormattedDate(fromDate)} -{" "}
          {getFormattedDate(toDate) ?? t("current")}
        </div>
      )}
      {skillsExistOnEntry && (
        <div className={styles.cv_skills_wrapper}>
          {cvEntry.skills?.map((entry: Skill) => {
            return (
              <div key={entry.id} className={styles.cv_list_item}>
                {entry.title ?? t("placeholderPosition")}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
