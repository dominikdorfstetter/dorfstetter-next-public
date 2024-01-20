import React from "react";

/**
 * Renders a loading blog component.
 *
 * @returns {React.JSX.Element} - The loading blog component.
 */
export default function LoadingBlog(): React.JSX.Element {
    return (
        <div className={`loading_wrapper`}>
            <div className={`loading_spinner`}></div>
        </div>
    );
}