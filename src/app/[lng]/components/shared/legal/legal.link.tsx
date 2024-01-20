"use client";

import React, { useCallback } from "react";
import styles from "./legal.module.scss";

type LegalLinkProps = Readonly<{ text: string }>;

/**
 * Creates a legal link component.
 *
 * @param {Object} params - The parameters for the component.
 * @param {string} params.text - The text to be displayed in the link.
 * @return {React.JSX.Element} The legal link component.
 */
function LegalLink({ text }: LegalLinkProps): React.JSX.Element {
  const handleClick = useCallback(() => {
    document.body.classList.add("scroll_disabled");
    (document.getElementById("legal-banner") as any).ariaHidden = false;
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div
      tabIndex={0}
      className={styles.legal__link}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {text}
    </div>
  );
}

export default LegalLink;
