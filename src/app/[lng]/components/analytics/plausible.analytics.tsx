"use client";

import React from "react";
import {useCookies} from "react-cookie";
import {Helmet} from "react-helmet";

export default function PlausibleAnalytics(): React.JSX.Element {
    const [cookies] = useCookies([]);
    const isConsentGiven = (cookies as any)['legal']?.['analytics']?.plausible ?? false;

    return (
        <>
            {
                isConsentGiven ? <Helmet>
                    <script test-id="plausible-script" defer data-domain={"dorfstetter.at"} src={"https://plausible.io/js/script.js"} />
                </Helmet> : <></>
            }
        </>
    );
}