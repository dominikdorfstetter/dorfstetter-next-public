import React from "react";
import {useTranslation as serverSideTranslation} from "@app/i18n";
import {Trans} from "react-i18next/TransWithoutContext";
import {languages} from "@app/i18n/settings";
import Link from "next/link";
import styles from "./languageswitcher.module.scss";

/**
 * Represents the parameters for the language switcher.
 *
 * @interface
 */
interface LanguageSwitcherParams {
    params: {
        lng: string;
    };
}

/**
 * Renders a language switcher component with the provided language.
 *
 * @param {Readonly<LanguageSwitcherParams>} params - The object containing the language parameter.
 * @param {string} params.lng - The selected language.
 * @returns {Promise<React.JSX.Element>} - The rendered language switcher component.
 */
export default async function LanguageSwitcher({params: {lng}}: Readonly<LanguageSwitcherParams>): Promise<React.JSX.Element> {
    const {t} = await serverSideTranslation(lng, 'footer') as any;

    // Extract the filtered languages into a new variable
    const otherLanguages: string[] = languages.filter(l => lng !== l);

    return (
        <div>
            <Trans i18nKey="languageSwitcher" t={t}>
                <span className={styles.chosenLang}>{t(lng)}</span> | {' '}
            </Trans>
            {otherLanguages.map((l: string, index: number) => {
                return (
                    <span key={l}>
                        {index > 0 && (` | `)}
                        <Link href={`/${l}`} title={t(`${l}-long`)} className={styles.lang__link} tabIndex={0}>
                            {t(l)}
                        </Link>
                    </span>
                )
            })}
        </div>
    )
}