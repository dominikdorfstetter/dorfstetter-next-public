"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  LegalItem,
  LegalTranslation,
} from "@app/[lng]/components/shared/legal/legal.types";
import LegalItemComponent from "@app/[lng]/components/shared/legal/legal.item";
import { useCookies } from "react-cookie";
import styles from "./legal.module.scss";
import { COOKIE_OPTIONS } from "@app/cookies";

/**
 * Checks if all children items are true for a given parent and group.
 *
 * @param {string} parent - The parent identifier.
 * @param {string} group - The group identifier.
 * @param {LegalItem[]} items - The list of legal items.
 * @param {any} cookies - The cookies object containing the parent and group data.
 * @returns {boolean} - True if all children items are true, false otherwise.
 */
const allChildrenTrue = (
  parent: string,
  group: string,
  items: LegalItem[],
  cookies: any,
): boolean => {
  const parentData = cookies[parent] ?? {};
  const groupData = parentData[group] ?? {};
  const allGroups = items.map((element) => element.cookie);

  if (!cookies || !parentData[group] || !items) return false;

  return Object.values(allGroups).every((item: any) => {
    const cookieValue = groupData[item] ?? false;

    const checkExistsValue = (element: LegalItem) => element.cookie === item;
    const existsInItems = items.some(checkExistsValue);

    return existsInItems && cookieValue;
  });
};

/**
 * Represents a legal group component.
 *
 * @param {Object} params - The parameters for the legal group component.
 * @param {string} params.title - The title of the legal group.
 * @param {string} params.cookie - The cookie name associated with the legal group.
 * @param {LegalItem[]} params.items - An array of legal items within the legal group.
 * @param {string} parent - The parent of the legal group component.
 * @param {string} group - The group name for the legal group component.
 * @param {LegalTranslation} translation - The translation data for the legal group component.
 * @param {number} tabIndex - The tab index for the legal group component.
 * @returns {React.JSX.Element} The rendered legal group component.
 * @constructor
 */
function LegalGroupComponent({
  params: { title, cookie, items },
  parent,
  group,
  translation,
  tabIndex,
}: Readonly<{
  params: {
    title: string;
    cookie: string;
    items: LegalItem[];
  };
  parent: string;
  group: string;
  translation: LegalTranslation;
  tabIndex: number;
}>): React.JSX.Element {
  const [cookies, setCookie] = useCookies([parent]);
  const [allItemsTrue, setAllItemsTrue] = useState(false);

  useEffect(() => {
    setAllItemsTrue(allChildrenTrue(parent, group, items, cookies));
  }, [cookies, group, items, parent]);

  const setAllChildren = useCallback(
    (
      items: LegalItem[],
      cookies: { [p: string]: any },
      value: boolean,
      parent: string,
    ) => {
      const parentObj: { [p: string]: any } = { ...cookies };
      const allGroups = items.map((item) => item.cookie);

      if (!cookies || !cookies[group]) {
        parentObj[group] = {};
      }

      // set all items to value
      allGroups.forEach((item: string) => {
        parentObj[group][item] = value;
      });

      // set the cookie
      try {
        setCookie(parent, JSON.stringify(parentObj), COOKIE_OPTIONS);
      } catch (error) {
        console.error(`Couldn't set cookie. Error: ${error}`);
      }
    },
    [group, setCookie],
  );

  return (
    <div className={styles.banner__group} key="legal-group" tabIndex={-1}>
      <h2 className={styles.banner__title}>{title}</h2>
      <label className={styles.banner__checkbox}>
        <input
          type="checkbox"
          checked={allItemsTrue}
          onChange={() =>
            setAllChildren(items, cookies[parent], !allItemsTrue, parent)
          }
        />
        {`${translation.acceptAll}: "${title}"`}
      </label>
      <ul className={styles.banner__group_list}>
        {items?.map(
          ({
            id,
            title: itemTitle,
            content,
            cookie: itemCookie,
          }: LegalItem) => {
            const legalItemOptions = {
              content: content,
              cookie: itemCookie,
              title: itemTitle,
              parent,
              group,
            };

            return (
              <LegalItemComponent
                params={legalItemOptions}
                key={`${id}-${group}`}
                translation={translation}
              />
            );
          },
        )}
      </ul>
    </div>
  );
}

export default LegalGroupComponent;
