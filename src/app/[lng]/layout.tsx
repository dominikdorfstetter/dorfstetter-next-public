import "./styles/global.scss";
import "./styles/fonts.scss";
import "./styles/icons.scss";
import React, { ReactElement } from "react";
import styles from "./layout.module.scss";
import { dir } from "i18next";
import Header from "@app/[lng]/components/layout/header";
import Footer from "@app/[lng]/components/layout/footer";
import { Metadata } from "next";
import { useTranslation as serverSideTranslation } from "@app/i18n";
import LegalComponent from "@app/[lng]/components/shared/legal/legal.component";
import Favicon from "@app/[lng]/components/layout/favicon";
import PlausibleAnalytics from "@app/[lng]/components/analytics/plausible.analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const languages: string[] = ["de", "en", "es"];

/**
 * This function builds the static paths for the general layout of the website.
 *
 * @return {Promise<{lng: string}[]>} Array of language codes.
 */
export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng): { lng: string } => ({ lng }));
}

/**
 * Renders the root layout of the application.
 *
 * @param {Object} options - The options for the root layout.
 * @param {React.ReactNode} options.children - The children elements to be rendered within the root layout.
 * @param {Object} options.params - The parameters for the root layout.
 * @param {string} options.params.lng - The language parameter for the root layout.
 *
 * @returns {Promise<React.ReactElement>} - A promise that resolves to the root layout as a React element.
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>): Promise<ReactElement> {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <body>
        <Favicon />
        <div className={styles.mainWrapper}>
          <div className={styles.contentWrapper}>
            <Header params={params} />
            {children}
          </div>
          <Footer params={params} />
        </div>
        <PlausibleAnalytics />
        <LegalComponent params={params} />
        <SpeedInsights />
      </body>
    </html>
  );
}

/**
 * Generates metadata for the given language.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.lng - The language to generate metadata for.
 * @returns {Promise<Metadata>} - The generated metadata.
 */
export async function generateMetadata({
  params: { lng },
}: Readonly<{
  params: {
    lng: string;
  };
}>): Promise<Metadata> {
  const { t } = await serverSideTranslation(lng, "common");
  const keywords: string[] =
    t("meta-keywords")
      .split(",")
      .map((keyword: string) => keyword.trim()) || [];
  return {
    title: t("meta-title"),
    metadataBase: new URL(t("meta-site-base")),
    alternates: {
      languages: {
        de: "/de",
        en: "/en",
        es: "/es",
      },
    },
    description: t("meta-description"),
    keywords: keywords,
    openGraph: {
      title: t("meta-title"),
      description: t("meta-description"),
      type: "website",
      locale: lng,
    },
    generator: "Next.js",
    applicationName: t("meta-site-name"),
    publisher: t("meta-author"),
    creator: t("meta-author"),
    referrer: "origin-when-cross-origin",
    robots: "all",
  };
}
