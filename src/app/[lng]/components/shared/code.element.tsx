"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark as codestyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeElementProps {
  code: string;
  elementId: string;
  translation: {
    copy2text: string;
    copy2success: string;
  };
}

/**
 * Creates a component that represents a code element.
 *
 * @param {CodeElementProps} props - The props object containing the code, elementId, and translation.
 * @returns {JSX.Element} - The JSX element representing the code element.
 */
function CodeElement({
  code,
  elementId,
  translation,
}: Readonly<CodeElementProps>): React.JSX.Element {
  const updateElementStyle = (content: string) => {
    document.styleSheets[0].insertRule(
      `#${elementId}::after {content: '${content}';}`,
      0,
    );
  };

  const copyFunction = () => {
    const copyText = document.getElementById(elementId)?.textContent ?? "";

    navigator.clipboard.writeText(copyText).then(
      () => {
        updateElementStyle(translation.copy2success);
        console.log("Copied to clipboard");
      },
      () => {
        updateElementStyle("Error while copying to clipboard!");
        console.log("Failed to copy to clipboard");
      },
    );
  };

  return (
    <div onClick={copyFunction} onKeyDown={copyFunction}>
      <SyntaxHighlighter id={elementId} language="javascript" style={codestyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeElement;
