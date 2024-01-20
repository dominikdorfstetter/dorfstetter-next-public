"use client";

import React, {useEffect, useState} from "react";
import {useTranslation as serverSideTranslation} from "@app/i18n";
import Icon from "@app/[lng]/components/icon";
import {IconProps} from "@app/[lng]/blog/[id]";

/**
 * Shares the given URL and title using the Web Share API.
 *
 * @param {string} url - The URL to be shared.
 * @param {string} title - The title of the shared content.
 * @returns {Promise<void>} - A promise that resolves when the sharing is successful, or rejects with an error.
 */
const share = async (url: string, title: string): Promise<void> => {
    if (navigator.share) {
        await navigator.share({
            title,
            url,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}

function ShareButton({
                               lng, url, title
                           }: Readonly<{ lng: string; url: string, title: string }>): React.JSX.Element {
    const [iconShare, setIconShare] = useState<IconProps | null>(null)

    useEffect(() => {
        const fetchServerSideTranslation = async () => {
            const translation = await serverSideTranslation(lng, 'common');

            setIconShare({
                type: 'share',
                icon_text: translation.t('share'),
                aria_role: 'presentation'
            });
        };

        fetchServerSideTranslation();
    }, [lng])

    // Share the current page.
    const handleShare = (): Promise<void> => share(url, title);
    // is sharing available?
    const sharingAvailable = !!global?.navigator?.share;

    return (
        <>
            {
                (iconShare && sharingAvailable) && <div tabIndex={0} className="share_button" onClick={handleShare}>
                    <Icon params={iconShare}/>
                </div>
            }
        </>

    );
}

export default ShareButton;