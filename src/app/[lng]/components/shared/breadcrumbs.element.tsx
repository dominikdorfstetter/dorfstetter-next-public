"use client";

import React from "react";
import styles from "./breadcrumbs.module.scss";
import Link from "next/link";
import Icon, { IconProps, IconType } from "@app/[lng]/components/icon";

export type BreadCrumbsElement = {
  icon?: IconType;
  title: string;
  url?: string;
};

export type BreadcrumbsProps = {
  crumbs: BreadCrumbsElement[];
  current?: BreadCrumbsElement;
};

function BreadcrumbsElement({
  crumbs,
  current,
}: Readonly<BreadcrumbsProps>): React.JSX.Element {
  const reduceText = (text: string) => {
    if (text.length > 15) {
      return text.substring(0, 15) + "...";
    } else return text;
  };
  return (
    <div className={styles.breadcrumbs__container}>
      {crumbs.length > 0 &&
        crumbs.map(({ title, url, icon }: BreadCrumbsElement, index) => {
          const iconElement: IconProps = {
            type: icon ?? "home",
            icon_text: title,
            aria_role: "presentation",
            hoverEffect: false,
            inverted: true,
          };
          return (
            <>
              <span key={title} className={styles.breadcrumbs__element}>
                <Link href={url || "#"}>
                  {icon ? <Icon params={iconElement} /> : reduceText(title)}
                </Link>
              </span>
              {current && (
                <span className={styles.breadcrumbs__element}>
                  <span>&gt;</span>
                </span>
              )}
            </>
          );
        })}
      {current ? (
        <span className={styles.breadcrumbs__element}>
          {reduceText(current.title)}
        </span>
      ) : null}
    </div>
  );
}

export default BreadcrumbsElement;
