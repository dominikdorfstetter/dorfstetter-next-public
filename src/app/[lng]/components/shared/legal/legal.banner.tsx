"use client";
import {LegalData, LegalGroup, LegalItem, LegalTranslation} from "@app/[lng]/components/shared/legal/legal.types";
import React, {useCallback, useEffect} from "react";
import LegalGroupComponent from "@app/[lng]/components/shared/legal/legal.group";
import {useCookies} from "react-cookie";
import styles from "@app/[lng]/components/shared/legal/legal.module.scss";
import Icon from "@app/[lng]/components/icon";
import {COOKIE_OPTIONS} from "@app/cookies";

/**
 * Represents a Cookie.
 *
 * @typedef {object} Cookie
 * @property {Object.<string, Object.<string, any>>} - The properties of the cookie.
 */
type Cookie = {
    [name: string]: {
        [name: string]: any;
    };
}

/**
 * Check if all items in a group have a specific value in the cookies object.
 *
 * @param {LegalGroup[]} groups - An array of LegalGroup objects.
 * @param {Cookie} cookies - The cookies object that contains group and item cookies.
 * @param {boolean} value - The value to check against for all items in the group.
 *
 * @returns {boolean} - True if all items in the group have the specified value in the cookies object, otherwise false.
 */
const checkAllItemsInGroup = (groups: LegalGroup[], cookies: Cookie, value: boolean): boolean => {

    return groups.every(({cookie, items}: LegalGroup) => {
        const groupCookie: string = cookie;

        if (!groupCookie || !cookies?.[`${groupCookie}`]) {
            return false;
        }

        return items.every(({cookie}: LegalItem): boolean => cookies[`${groupCookie}`][`${cookie}`] === value);
    });
}

/**
 * Renders a legal banner component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The legal data parameters.
 * @param {string} props.params.title - The title of the legal banner.
 * @param {string} props.params.cookie - The name of the cookie to use.
 * @param {Array<Object>} props.params.groups - The array of legal groups.
 * @param {string} props.params.intro - The introductory message of the legal banner.
 * @param {string} props.params.updatedAt - The date of the last update.
 * @param {Object} props.translation - The translation data for the legal banner.
 * @returns {React.JSX.Element} - The legal banner component.
 */
function LegalBanner({
                         params: {
                             title, cookie, groups, intro, updatedAt
                         }, translation
                     }: Readonly<{
    params: LegalData;
    translation: LegalTranslation;
}>): React.JSX.Element {
    const [cookies, setCookie] = useCookies([`${cookie}`]);

    if (cookies) {
        const allChecked = checkAllItemsInGroup(groups, cookies[`${cookie}`], true);
        const allDenied = checkAllItemsInGroup(groups, cookies[`${cookie}`], false);
    }

    useEffect(() => {
        const seenCookieBanner: boolean = cookies?.[`${cookie}`];

        if (!seenCookieBanner) {
            (document.getElementById('legal-banner') as any).ariaHidden = false;
            (document.body).classList.add('scroll_disabled');
        }
    });

    /**
     * Sets user cookie, hides legal banner and reloads the window.
     *
     * @function handlePopupClose
     * @returns {void}
     */
    const handlePopupClose = useCallback(() => {
        if(!cookies?.[`${cookie}`])
            setAllCookies(groups, cookies, cookie, false);

        (document.body).classList.remove('scroll_disabled');
        (document.getElementById('legal-banner') as any).ariaHidden = true;
        window.location.reload();
    }, [setCookie, translation.userCookie]);

    /**
     * A function to handle key down events and perform an action if the Enter key is pressed.
     *
     * @param {React.KeyboardEvent} event - The keyboard event object.
     * @returns {void}
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handlePopupClose();
        }
    }, [handlePopupClose]);

    /**
     * Updates the value of a particular cookie for all items in the given legal groups.
     *
     * @param {LegalGroup[]} groups - The legal groups containing the items to update the cookie value for.
     * @param {Object} cookies - The current cookies object.
     * @param {string} cookie - The name of the cookie to update.
     * @param {boolean} value - The new value for the cookie.
     * @param {function} closePopup - A function to close the popup.
     * @returns {void}
     */
    const setAllCookies = (
        groups: LegalGroup[],
        cookies: any,
        cookie: string,
        value: boolean,
        closePopup?: () => void
    ): void => {
        let updatedCookies: any = {...cookies};

        // Update the cookies object with the new value for all items in the group.
        groups.forEach((group: LegalGroup) => {
            if (!updatedCookies[group.cookie]) {
                updatedCookies[group.cookie] = {};
            }

            group.items.forEach((item: LegalItem) => {
                updatedCookies[group.cookie][item.cookie] = value;
            });
        });

        // Set the cookies object in the browser.
        try {
            setCookie(cookie, JSON.stringify(updatedCookies), COOKIE_OPTIONS);
        } catch (error) {
            console.error('Error setting cookies:', error);
        }

        if(closePopup)
            closePopup();
    };



    return (
        <div id={`legal-banner`} className={styles.legal__banner} aria-hidden={true}>
            <div className={styles.banner__backdrop} onClick={handlePopupClose} onKeyDown={handleKeyDown}
                 tabIndex={-1}/>
            <div className={styles.banner_wrapper}>
                <div className={styles.banner__header}>
                    <div className={styles.banner__title} tabIndex={-1}>{title}</div>
                    <div tabIndex={0} onClick={handlePopupClose} onKeyDown={handleKeyDown}
                         className={styles.banner__close}>
                        <Icon params={{type: 'close', icon_text: translation.close, aria_role: 'img'}}/>
                    </div>
                </div>
                {/*<p className={styles.banner__lastUpdated}>{translation.lastUpdated}: {updatedAt}</p>*/}
                <p className={styles.banner__intro}>{intro}</p>

                {groups?.map((group: LegalGroup) => {
                    const groupOptions = {
                        title: group.title,
                        cookie: group.cookie,
                        items: group.items
                    }

                    return <LegalGroupComponent params={groupOptions} parent={cookie}
                                                group={group.cookie}
                                                tabIndex={0}
                                                translation={translation}
                                                key={group.id} />
                })}

                <div className={styles.banner__button_row}>
                    <button type={"button"} onClick={() => {
                        setAllCookies(groups, cookies[`${cookie}`], cookie, true, handlePopupClose);
                    }}>
                        {`${translation.acceptAll}`}
                    </button>
                    <button type={"button"} onClick={handlePopupClose}>
                        {`${translation.save}`}
                    </button>
                    <button type={"button"} onClick={() => {
                        setAllCookies(groups, cookies[`${cookie}`], cookie, false, handlePopupClose);
                    }}>
                        {`${translation.denyAll}`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LegalBanner;