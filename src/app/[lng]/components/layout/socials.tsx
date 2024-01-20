"use client";
/**
 * Imports
 */
import Image from 'next/image';
import Link from "next/link";
import styles from './socials.module.scss';
import React from "react";

export interface SocialEntry {
    id: number;
    attributes: Attributes;
}

export interface Attributes {
    title: string;
    url: string;
    icon: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export default function Socials({
                                    socials
                                }:
                                    Readonly<{
                                        socials: SocialEntry[];
                                    }>
):
    React.JSX.Element {
    return (
        <div className={styles.socialsWrapper}>
            {socials.map((social: SocialEntry) => {
                return (
                    <div key={social?.id}>
                        <Link href={social?.attributes?.url} target="_blank" rel="noreferrer"
                              className={styles.socialLink}
                              title={social?.attributes?.alt} tabIndex={0}>
                            <Image
                                className={styles.socialIcon}
                                priority
                                src={`/icons/social/${social?.attributes?.icon}.svg`}
                                alt={`Follow me on ${social?.attributes?.alt}`}
                                height={35}
                                width={35}
                                role={'link'}
                                tabIndex={-1}
                            />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}