import React from "react";
import {useTranslation as serverSideTranslation} from "@app/i18n";
import styles from './linklist.module.scss';
import Icon from "@app/[lng]/components/icon";
import Link from "next/link";
import {IconProps, LanguageProps, LinkData, LinksListProps, TranslationResponse} from "@app/[lng]/blog/[id]/index";
import {getIcon} from "@app/[lng]/blog/[id]/blog.utilities";

/**
 * Retrieves translations for a specific language.
 *
 * @param {string} lng - The language code for the desired translations.
 * @return {Promise<TranslationResponse>} - A promise that resolves with an object containing the requested translations.
 */
async function getTranslations(lng: string): Promise<TranslationResponse> {
    const commonTranslation = await serverSideTranslation(lng, 'common');
    const iconTranslation = await serverSideTranslation(lng, 'icons');

    return {commonTranslation, iconTranslation};
}

/**
 * Returns an object containing properties for an icon link.
 *
 * @param {LanguageProps} iconTranslation - An object that provides translation for the icon text.
 * @return {IconProps} - An object containing the following properties:
 *   - type: 'link' (string) - The type of the icon.
 *   - icon_text: The translated text for the icon link.
 *   - aria_role: 'img' (string) - The ARIA role for the icon.
 */
function getIconLink(iconTranslation: LanguageProps): IconProps {
    return {
        type: 'link',
        icon_text: iconTranslation.t('link'),
        aria_role: 'img'
    };
}

/**
 * Render a list of links with icons.
 *
 * @param {LinksListProps} props - The properties for configuring the LinksList component.
 * @returns {Promise<React.JSX.Element>} The rendered React element.
 */
async function LinksList(props: LinksListProps): Promise<React.JSX.Element> {
    const {commonTranslation, iconTranslation} = await getTranslations(props.lng);

    return (
        <>
            <h2>{commonTranslation.t('links-headline')}</h2>
            {
                props.links?.map((link: LinkData, index: number) => {
                    const linkIconProps = getIcon(iconTranslation, 'link');

                    return (
                        <Link key={`link-${index}`}
                              href={link.url}
                              target={'_blank'}
                              title={link.alt}
                              className={styles.links_wrapper}>
                            <Icon params={linkIconProps}/>
                            <div className={styles.link_list_item}>{link.title}</div>
                        </Link>
                    );
                })
            }
        </>
    );
}

export default LinksList;