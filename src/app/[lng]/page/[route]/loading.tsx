import React from "react";

/**
 * Renders a loading spinner component wrapped in a container.
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