import React from "react";
import {useTranslation as serverSideTranslation} from '@app/i18n';
import LanguageSwitcher from "@app/[lng]/components/layout/languageswitcher";
import Link from "next/link";
import styles from './footer.module.scss';
import {HTTP_OPTIONS_FORCE_CACHE} from "@app/http.headers";
import Socials from "@app/[lng]/components/layout/socials";
import LegalLink from "@app/[lng]/components/shared/legal/legal.link";

export interface SocialsAPIResponse {
    data: SocialEntry[];
    meta: Meta;
}

interface Meta {
    pagination: Pagination;
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface SocialEntry {
    id: number;
    attributes: Attributes;
}

export interface Attributes {
    title: string;
    url: string;
    icon: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export async function getSocials(): Promise<SocialEntry[]> {
    const apiURL =
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/socials?filters[contexts][title][$eq]=dorfstetter.at`;

    const res: Response = await fetch(apiURL, HTTP_OPTIONS_FORCE_CACHE);
    const data: SocialsAPIResponse = await res.json();

    return data?.data;
}

export default async function Footer({params: {lng}}: Readonly<{
    params: {
        lng: string;
    }
}>): Promise<React.JSX.Element> {
    const socials: SocialEntry[] = await getSocials();
    const {t} = await serverSideTranslation(lng, 'footer');
    const options: { lng: string } = {
        lng: lng
    };

    return (
        <div className={styles.footerWrapper}>
            <footer className={styles.footer} style={{marginTop: 50}}>
                <div className={styles.grid_social}>
                    <Socials socials={socials}/>
                </div>
                <div className={styles.grid_translation}>
                    <LanguageSwitcher params={options}/>
                </div>
                <div className={styles.grid_links}>
                    <Link href={`/${lng}/page/imprint`}
                          title={t('imprint')}
                    >{t('imprint')}</Link>
                    <LegalLink text={`${t('cookie')}`}/>
                </div>

                <div className={styles.grid_copyright}>
                    {
                        /**
                         <div className={styles.grid_found_bug}>
                         {t('bug-found')} <Link href={t('bug-found-link')}
                         title={t('bug-found-link-title')} target={`_blank`}>
                         {t('bug-found-link-text')}
                         </Link>
                         </div> **/
                    }
                    <div className={styles.grid_credits}>
                        &copy;&nbsp;{t('copyright')}
                    </div>
                </div>

            </footer>
            <div className={styles.gradient_line}/>
        </div>
    )
}