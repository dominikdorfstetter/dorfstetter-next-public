import Icon, { AriaRole, IconType } from "@app/[lng]/components/icon";
import React from "react";
import Link from "next/link";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import styles from "./pagination.module.scss";

export async function Pagination({
  lng,
  route,
  currentPage,
  pageCount,
}: Readonly<{
  lng: string;
  route: string;
  currentPage: number;
  pageCount: number;
}>): Promise<React.JSX.Element> {
  const { t } = await serverSideTranslation(lng, "icons");

  const optionsArrowForward: {
    type: IconType;
    aria_role: AriaRole;
    icon_text: string;
  } = {
    type: "arrow_forward",
    icon_text: t("arrow_forward"),
    aria_role: "presentation",
  };
  const optionsArrowBack: {
    type: IconType;
    aria_role: AriaRole;
    icon_text: string;
  } = {
    type: "arrow_back",
    icon_text: t("arrow_back"),
    aria_role: "presentation",
  };

  const showPagination: boolean = pageCount > 1;
  const showNextButton: boolean = currentPage < pageCount;
  const showPrevButton: boolean = currentPage > 1;

  return (
    <div className={styles.pagination_wrapper}>
      {showPagination && showPrevButton && (
        <Link
          className={styles.pagination__link}
          href={`/${lng}/${route}/${currentPage - 1}`}
          title={t("arrow_back")}
        >
          <Icon params={optionsArrowBack} />
        </Link>
      )}
      {showPagination &&
        Array.from(Array(pageCount).keys()).map((p) => {
          const idx = p + 1;
          if (idx === currentPage) {
            return (
              <div key={idx} tabIndex={-1} className={styles.active__page}>
                {idx}
              </div>
            );
          }
          return (
            <Link
              className={styles.pagination_navlink}
              key={idx}
              href={`/${lng}/${route}/${idx}`}
              tabIndex={0}
            >
              <div tabIndex={-1}>{idx}</div>
            </Link>
          );
        })}
      {showPagination && showNextButton && (
        <Link
          className={styles.pagination__link}
          href={`/${lng}/${route}/${currentPage + 1}`}
          title={t("arrow_forward")}
        >
          <Icon params={optionsArrowForward} />
        </Link>
      )}
    </div>
  );
}
