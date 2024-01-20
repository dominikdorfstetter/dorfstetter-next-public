"use client";
import styles from './legal.module.scss';

import React, {useCallback, useMemo, useState} from "react";
import ContentElement from "@app/[lng]/components/shared/content.element";
import {useCookies} from 'react-cookie';
import {LegalTranslation} from "@app/[lng]/components/shared/legal/legal.types";
import {COOKIE_OPTIONS} from "@app/cookies";
import {set} from "immutable";

type LegalItemParams = Readonly<{
    content: any;
    cookie: string;
    title: string;
    parent: string;
    group: string;
}>;

type LegalItemProps = Readonly<{
    params: LegalItemParams;
    translation: LegalTranslation;
}>;

/**
 * Render a Legal Item Component
 *
 * @param {object} params - The parameters for the component
 * @param {any} params.content - The content of the component
 * @param {string} params.cookie - The cookie name
 * @param {string} params.title - The title of the component
 * @param {string} params.parent - The parent name
 * @param {string} params.group - The group name
 * @param {string} key - The key for the component
 * @param {object} translation - The translation for the component
 * @returns {JSX.Element} - The rendered legal item component
 */
function LegalItemComponent({
                                params: {content, cookie, title, parent, group},
                                translation
                            }: LegalItemProps): React.JSX.Element {
    const [cookies, setCookie] = useCookies([`${parent}`]);
    const checked = cookies[`${parent}`]?.[`${group}`]?.[`${cookie}`] ?? false;
    const [isActive, setIsActive] = useState(false);

    const handleChange = useCallback(() => {
        const parentObj = cookies[`${parent}`] ?? {};
        const groupObj = parentObj[group] ?? {};
        const cookieValue = groupObj[cookie] ?? false;

        const newObj = {
            ...parentObj,
            [group]: {
                ...groupObj,
                [cookie]: !cookieValue
            }
        };

        try {
            setCookie(`${parent}`, JSON.stringify(newObj), COOKIE_OPTIONS);
        } catch (error) {
            console.error(`Couldn't set cookie. Error: ${error}`);
        }


    }, [cookies, cookie, group, parent, setCookie]);

    // memoize the content element
    const memoizedContentElement: React.JSX.Element =
        useMemo(() => <ContentElement content={content} context={`blog`}
                                      translation={{copy2text: "", copy2success: ""}}/>, [content]);

    return (
        <li className={styles.accordion} tabIndex={-1}>
            <div className={styles.accordion__title}>
                <div>{title}</div>
                <div className={styles.accordion__toggle} tabIndex={0}
                     onClick={() => setIsActive(!isActive)}
                     onKeyDown={(e) => {
                         if (e.key === 'Enter') setIsActive(!isActive)
                     }}>
                    {isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className={styles.accordion__content}>
                {memoizedContentElement}
                <label className={styles.banner__checkbox}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                    {translation.accept}
                </label>
            </div>}
        </li>
    );
}

export default LegalItemComponent;