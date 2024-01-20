import React from "react";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import Navigation, { NavLang } from "@app/[lng]/components/layout/navigation";

export default async function Header({
  params: { lng },
}: Readonly<{
  params: {
    lng: string;
  };
}>): Promise<React.JSX.Element> {
  const { t } = await serverSideTranslation(lng, "nav");

  const navLang: NavLang = {
    c2a: t("c2a"),
    about: t("about"),
    home: t("home"),
    cv: t("cv"),
    portfolio: t("portfolio"),
    blogs: t("blogs"),
    iconMenu: t("menu"),
    iconMail: t("mail"),
    mailtoSubject: t("mailto-subject"),
  };

  return <Navigation lng={lng} lang={navLang} />;
}
