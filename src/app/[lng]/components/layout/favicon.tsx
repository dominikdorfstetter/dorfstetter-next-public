"use client";

import React from "react";

/**
 * Represents a component for rendering the favicon and related metadata in a React application.
 *
 * @returns {React.JSX.Element} The JSX elements containing the favicon and related metadata.
 */
const Favicon = (): React.JSX.Element => {
  const faviconDir: string = "/favicon/";

  return (
    <>
      <link rel="icon" type="image/x-icon" href={faviconDir + "favicon.ico"} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={faviconDir + "apple-touch-icon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={faviconDir + "favicon-32x32.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={faviconDir + "favicon-16x16.png"}
      />
      <link rel="manifest" href={faviconDir + "site.webmanifest"} />
      <link
        rel="mask-icon"
        href={faviconDir + "safari-pinned-tab.svg"}
        color="#5bbad5"
      />
      <meta name="apple-mobile-web-app-title" content="Snippit" />
      <meta name="application-name" content="dorfstetter.at" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
};

export default Favicon;
