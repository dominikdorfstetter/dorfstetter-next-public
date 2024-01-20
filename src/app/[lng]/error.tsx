"use client";

import React from "react";
import styles from "@app/[lng]/error.module.scss";
import Image from "next/image";

/**
 * Renders an AppError component.
 *
 * @returns {React.Element} - The rendered AppError component.
 */
export default function AppError(): React.JSX.Element {
  return (
    <div className={styles.error_wrapper}>
      <Image
        className={styles.error_image}
        width={500}
        height={500}
        src={`/img/error_monster.svg`}
        alt={`Error Monster`}
      ></Image>
    </div>
  );
}
