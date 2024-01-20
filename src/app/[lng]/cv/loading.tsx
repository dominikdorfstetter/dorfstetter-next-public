import React from "react";

/**
 * Renders the loading spinner component.
 *
 * @returns {React.JSX.Element} The loading spinner component.
 */
export default function LoadingCV(): React.JSX.Element {
    return (
        <div className={`loading_wrapper`}>
            <div className={`loading_spinner`}></div>
        </div>
    );
}