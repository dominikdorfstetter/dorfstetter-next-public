import React from "react";

/**
 * Renders a loading component for blogs.
 *
 * @returns {React.JSX.Element} - The loading component.
 */
export default function LoadingBlogs(): React.JSX.Element {
  return (
    <div className={`loading_wrapper`}>
      <div className={`loading_spinner`}></div>
    </div>
  );
}
