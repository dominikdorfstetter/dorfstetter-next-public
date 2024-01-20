"use client";
import styles from "./navigation.module.scss";
import { NavLang } from "@app/[lng]/components/layout/navigation";
import Link from "next/link";
import React, { useRef } from "react";

function NavigationMenu({
  lng,
  navLang,
  isOpen,
  toggle,
}: Readonly<{
  lng: string;
  navLang: NavLang;
  isOpen: boolean;
  toggle: () => void;
}>): React.JSX.Element {
  const navWrapperRef = useRef(null);

  const NavItem = (hrefSuffix: string, title: string, key: string) => {
    return (
      <NavigationMenuItem
        key={key}
        href={`/${lng}/${hrefSuffix}`}
        title={title}
        toggle={toggle}
      />
    );
  };

  const menu: string[] = ["", "page/about", "cv", "blogs"];
  const menuTitles: string[] = [
    navLang.home,
    navLang.about,
    navLang.cv,
    navLang.blogs,
  ];

  return (
    <div className={`styles.nav_menu`} aria-hidden={!isOpen}>
      <div
        id={"nav_overlay"}
        onClick={toggle}
        className={styles.nav_overlay}
        tabIndex={-1}
      ></div>
      <ul id={"nav_items"} ref={navWrapperRef} className={styles.nav_wrapper}>
        {menu.map((detail: string, index: number) =>
          NavItem(detail, menuTitles[index], `item-${index}`),
        )}
      </ul>
    </div>
  );
}

function NavigationMenuItem({
  href,
  title,
  toggle,
}: Readonly<{
  href: string;
  title: string;
  toggle: () => void;
}>): React.JSX.Element {
  return (
    <li onClick={toggle} className={styles.nav_item} tabIndex={-1}>
      <Link
        className={styles.menuLink}
        href={`${href}`}
        title={title}
        tabIndex={0}
      >
        {title}
      </Link>
    </li>
  );
}

export default NavigationMenu;
