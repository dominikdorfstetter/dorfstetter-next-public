"use client";
import React, {useState} from "react";
import styles from './navigation.module.scss';
import Icon, {AriaRole, IconType} from "@app/[lng]/components/icon";
import NavigationMenu from "@app/[lng]/components/layout/navigation.menu";
import Link from "next/link";
import Image from "next/image";

export interface NavLang {
    c2a: string;
    home: string;
    about: string;
    blogs: string;
    cv: string;
    portfolio: string;
    iconMenu: string;
    iconMail: string;
    mailtoSubject: string;
}

// Extracting out the interface type
interface IconProps {
    type: IconType;
    aria_role: AriaRole;
    icon_text: string;
}

const Navigation = ({lng, lang}: { lng: string, lang: NavLang }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const iconMenu: IconProps = {
        type: 'menu',
        icon_text: lang.iconMenu,
        aria_role: 'img'
    };

    const iconClose: IconProps = {
        type: 'close',
        icon_text: lang.iconMenu,
        aria_role: 'img'
    }

    const iconMail: IconProps = {
        type: 'mail',
        icon_text: lang.iconMenu,
        aria_role: 'img'
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            return toggle();
        }
    }

    // Extracting out the logic to form className
    const getClassName = (...classes: string[]) => classes.join(' ');

    return (
        <nav className={styles.navMenu}>
            <Link href={`mailto:dominik@dorfstetter.at?subject=${lang.mailtoSubject}`}
                  className={getClassName(styles.navIcon, styles.left_nav)}
                  tabIndex={0}>
                <Icon params={iconMail}/>
            </Link>
            <Link href={`/${lng}`} title={`dorfstetter.at`} className={getClassName(styles.box, styles.mid_nav)}
                  tabIndex={0}>
                <Image src={`/img/logo_short.svg`} alt={`logo`} width={100} height={100} tabIndex={-1} priority />
            </Link>
            <div className={getClassName(styles.navIcon, styles.right_nav)} onClick={toggle} onKeyDown={() => handleKeyDown}
                 tabIndex={0}>
                <Icon params={!isOpen ? iconMenu : iconClose}/>
            </div>
            <NavigationMenu lng={lng} navLang={lang} isOpen={isOpen} toggle={toggle}/>
        </nav>
    );
};

export default Navigation;