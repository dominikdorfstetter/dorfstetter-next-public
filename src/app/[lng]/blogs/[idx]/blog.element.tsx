import React from "react";
import {useTranslation as serverSideTranslation} from "@app/i18n";
import styles from './blogs.module.scss';
import Image from "next/image";
import Icon, {AriaRole, IconType} from "@app/[lng]/components/icon";
import Link from "next/link";
import {Blog, BlogData, ImageFormat} from "@app/[lng]/blogs/[idx]/index";

/**
 * BlogPageElement is a method used to render a blog page element.
 *
 * @param {object} options - The options object.
 * @param {object} options.blog - The blog data.
 * @param {string} options.lng - The language of the blog.
 * @returns {Promise<React.JSX.Element>} - The blog page element.
 */
export async function BlogPageElement({
                                          blog,
                                          lng
                                      }: Readonly<{
    blog: BlogData;
    lng: string;
}>): Promise<React.JSX.Element> {
    const {title, author, date, teaserText} = blog.attributes || {};
    const {thumbnail, small, medium, large}: { thumbnail: ImageFormat; small: ImageFormat; medium: ImageFormat; large: ImageFormat; } = blog?.attributes.coverimage?.data?.attributes?.formats || {};
    const {t} = await serverSideTranslation(lng, 'blogs');
    const iconTranslation = await serverSideTranslation(lng, 'icons');

    const iconPerson: { type: IconType, aria_role: AriaRole, icon_text: string } = {
        type: 'person',
        icon_text: iconTranslation.t('person'),
        aria_role: 'presentation'
    };
    const iconEvent: { type: IconType, aria_role: AriaRole, icon_text: string } = {
        type: 'event',
        icon_text: iconTranslation.t('event'),
        aria_role: 'presentation'
    };

    return (
        <Link href={`/${lng}/blog/${blog.id}`} title={t('readme')}
              className={styles.blogcard_wrapper}>
            <div className={styles.blogcard_image_container}>
                <Image className={styles.blogcard_image} src={medium?.url}
                       placeholder={'blur'} blurDataURL={small?.url}
                       alt={large?.name} width={750} height={750}/>
            </div>
            <div className={styles.blogcard_content}>
                <h2 className={styles.gradient_font}>{title}</h2>
                <div className={styles.blogcard_meta_wrapper}>
                    <div className={styles.blogcard_meta_item}>
                        <Icon params={iconPerson}/>
                        <div className={styles.blogcard_meta_text}>{author}</div>
                    </div>
                    <div className={styles.blogcard_meta_item}>
                        <Icon params={iconEvent}/>
                        <div className={styles.blogcard_meta_text}>{date}</div>
                    </div>
                </div>
                <p className={styles.blogcard_teaser}>{teaserText}</p>
            </div>
        </Link>
    );
}