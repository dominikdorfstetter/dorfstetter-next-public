import React from "react";
import Image from "next/image";
import Link from "next/link";
import CodeElement from "@app/[lng]/components/shared/code.element";

export interface Content {
  type: ContentType;
  children: ContentElement[];
  level?: HeadlineLevel;
  format?: ListFormat;
  image?: ImageData;
}

type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;
type ListFormat = "unordered" | "ordered";

interface ImageData {
  name: string;
  alternativeText: string;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

interface Formats {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface ContentElement {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
  children?: ContentElement[];
}

type ContentType =
  | "paragraph"
  | "heading"
  | "image"
  | "list"
  | "link"
  | "quote"
  | "code";

/**
 * Generates a content element based on its type.
 *
 * @param {Content} contentElement - The content element to generate.
 * @param {string} context - The context in which the content element is generated.
 * @param {number} index - The index of the content element.
 * @param {Object} translation - The translation object containing copy text and success message.
 * @param {string} [lng='de'] - The language code.
 * @returns {React.JSX.Element} The generated content element.
 */
const generateContentElement = (
  contentElement: Content,
  context: string,
  index: number,
  translation: { copy2text: string; copy2success: string },
  lng: string = "de",
): React.JSX.Element => {
  switch (contentElement.type) {
    case "paragraph":
      return generateParagraph(contentElement, index);
    case "heading":
      return generateHeading(contentElement, index);
    case "image":
      return generateImage(contentElement, context, lng, index);
    case "list":
      return generateList(contentElement, index);
    case "quote":
      return generateQuote(contentElement, index);
    case "code":
      return generateCode(contentElement, index, translation);
    default:
      break;
  }

  return <></>;
};

/**
 * Generates JSX code for rendering a code element.
 *
 * @param {Content} contentElement - The content element containing the code.
 * @param {number} index - The index of the code element.
 * @param {object} translation - The translation object containing copy2text and copy2success strings.
 * @returns {JSX.Element} - The JSX element containing the rendered code.
 */
const generateCode = (
  contentElement: Content,
  index: number,
  translation: { copy2text: string; copy2success: string },
): JSX.Element => {
  const code = contentElement.children?.[0]?.text ?? "";
  const elementId = `code-${index}`;

  return (
    <CodeElement code={code} elementId={elementId} translation={translation} />
  );
};

/**
 * Generates a blockquote element for a given content element.
 *
 * @param {Content} contentElement - The content element.
 * @param {number} index - The index of the blockquote element.
 * @returns {React.JSX.Element} - The generated blockquote element.
 */
const generateQuote = (
  contentElement: Content,
  index: number,
): React.JSX.Element => {
  return (
    <blockquote key={index}>
      {processElements(contentElement.children)}
    </blockquote>
  );
};

/**
 * Renders a list element based on the given content and index.
 *
 * @param contentElement - The content element containing the format and children.
 * @param index - The index of the list element.
 * @returns A React JSX element representing the list.
 */
const generateList = (
  contentElement: Content,
  index: number,
): React.JSX.Element => {
  const { format } = contentElement;
  const { children } = contentElement;

  switch (format) {
    case "unordered":
      return (
        <ul key={index}>
          {children?.map((textElement: ContentElement, idx: number) => {
            return (
              <li key={`li-${idx}`}>{processElements(textElement.children)}</li>
            );
          })}
        </ul>
      );
    case "ordered":
      return (
        <ol>
          {children?.map((textElement: ContentElement, idx: number) => {
            return <li key={idx}>{processElements(textElement.children)}</li>;
          })}
        </ol>
      );
    default:
      return <></>;
  }
};

/**
 * Represents a translation object.
 *
 * @type {Object.<string, string>} Translation
 * @property {string} key - The key for the translation.
 * @property {string} value - The translated value for the key.
 */
type Translation = {
  [key: string]: string;
};
const defaultValue = "";
const removeQuotes = (text: string): string => text.trim().replaceAll('"', "");

const findTranslation = (translations: Translation[], lng: string): string => {
  return (
    translations.find((element: Translation) => element.key === lng)?.value ??
    defaultValue
  );
};

/**
 * Retrieves translation value from a text element.
 *
 * @param {string} text - The text element from which to retrieve the translation.
 * @param {string} lng - The desired language of the translation.
 * @returns {string} - The translation value for the specified language.
 */
const getTranslationFromTextElement = (text: string, lng: string): string => {
  const rawTranslations = text.split(";").map(removeQuotes);
  const translations = rawTranslations.map((translation: string) => {
    const [key, value] = translation.split(":");
    return { key, value };
  });
  return findTranslation(translations, lng);
};

/**
 * Generates an image element based on the given content, context, language, and index.
 *
 * @param {Content} contentElement - The content element containing the image data.
 * @param {string} context - The context in which the image is being used.
 * @param {string} lng - The language code for translation purposes.
 * @param {number} index - The index of the image element.
 * @returns {React.JSX.Element} - The generated image element.
 */
const generateImage = (
  contentElement: Content,
  context: string,
  lng: string,
  index: number,
): React.JSX.Element => {
  const { image } = contentElement || ({} as any);
  const url = image?.url ?? "";
  const name = image?.name ?? "";
  const altText = image?.alternativeText ?? "";
  const caption: string = image?.caption ?? "";

  return (
    <picture key={index}>
      <Image
        className={`${context}_image`}
        priority
        src={url}
        title={caption}
        alt={altText}
        height={350}
        width={350}
        role={"img"}
      />
      {caption && caption.length > 0 && (
        <figcaption className={`${context}_caption`}>
          &quot;{getTranslationFromTextElement(caption, lng)}&quot;
        </figcaption>
      )}
    </picture>
  );
};

/**
 * Generates a heading element based on the provided content and level.
 *
 * @param {Content} contentElement - The content element.
 * @param {number} index - The index of the content element.
 *
 * @returns {React.JSX.Element} - The generated heading element.
 */
const generateHeading = (
  contentElement: Content,
  index: number,
): React.JSX.Element => {
  const { level } = contentElement;

  switch (level) {
    case 1:
      return (
        <h1 key={index} className={`h1`}>
          {processElements(contentElement.children)}
        </h1>
      );
    case 2:
      return (
        <h2 key={index} className={`h2`}>
          {processElements(contentElement.children)}
        </h2>
      );
    case 3:
      return (
        <h3 key={index} className={`h3`}>
          {processElements(contentElement.children)}
        </h3>
      );
    case 4:
      return (
        <h4 key={index} className={`h4`}>
          {processElements(contentElement.children)}
        </h4>
      );
    case 5:
      return (
        <h5 key={index} className={`h5`}>
          {processElements(contentElement.children)}
        </h5>
      );
    case 6:
      return (
        <h6 key={index} className={`h6`}>
          {processElements(contentElement.children)}
        </h6>
      );
    default:
      return (
        <div key={index} className={`h7`}>
          {processElements(contentElement.children)}
        </div>
      );
  }
};

/**
 * Processes an array of ContentElement objects and generates React JSX elements.
 *
 * @param {ContentElement[] | undefined} elements - The array of ContentElement objects.
 * @returns {React.JSX.Element | React.JSX.Element[]} - The generated React JSX elements.
 */
const processElements = (
  elements: ContentElement[] | undefined,
): React.JSX.Element | React.JSX.Element[] => {
  if (!elements || elements.length === 0) {
    return <br />;
  }

  return (
    <>
      {elements.map((element: ContentElement, index: number) => {
        if (element.children) {
          return processElements(element.children);
        }
        return generateTextElement(element, index);
      })}
    </>
  );
};

/**
 * Generates a paragraph element with specified content and index.
 *
 * @param {Content} contentElement - The content element containing the paragraph children.
 * @param {number} index - The index of the paragraph element.
 * @returns {React.JSX.Element} - The generated paragraph element.
 */
const generateParagraph = (
  contentElement: Content,
  index: number,
): React.JSX.Element => {
  return (
    <p key={index}>
      {contentElement.children?.map(
        (textElement: ContentElement, idx: number) => {
          return generateTextElement(textElement, idx);
        },
      )}
    </p>
  );
};

/**
 * Generate a formatted text element.
 *
 * @param {ContentElement} textElement - The text element to generate.
 * @param {number} idx - The key for the text element.
 * @returns {React.JSX.Element} - The formatted text element.
 */
const generateTextElement = (
  textElement: ContentElement,
  idx: number,
): React.JSX.Element => {
  if (textElement.bold) {
    return <b key={idx}>{textElement.text}</b>;
  }

  if (textElement.italic) {
    return <i key={idx}>{textElement.text}</i>;
  }

  if (textElement.underline) {
    return <u key={idx}>{textElement.text}</u>;
  }

  if (textElement.strikethrough) {
    return <s key={idx}>{textElement.text}</s>;
  }

  if (textElement.type === "link") {
    return generateLink(textElement, idx);
  }

  return textElement?.text?.length !== 0 ? (
    <span key={idx}>{textElement.text}</span>
  ) : (
    <br key={idx} />
  );
};

/**
 * Generates a link element with provided content and index.
 *
 * @param {ContentElement} contentElement - The content element containing link information.
 * @param {number} index - The index of the link element.
 * @returns {React.JSX.Element} - The generated link element.
 */
const generateLink = (
  contentElement: ContentElement,
  index: number,
): React.JSX.Element => {
  const linkText = contentElement?.children?.[0]?.text ?? "";
  return (
    <Link
      key={index}
      href={contentElement?.url ?? ""}
      target="_blank"
      rel="noreferrer"
      title={linkText}
    >
      {linkText}
    </Link>
  );
};

export type PageContext = "page" | "blog";

/**
 * Renders a content page element based on the provided parameters.
 *
 * @param {Object} props - The props for the ContentPageElement.
 * @param {Array} props.content - The content array.
 * @param {string} [props.context='page'] - The context of the element.
 * @param {number} [props.index=0] - The index of the element.
 * @param {Object} props.translation - The translation object.
 * @param {string} props.translation.copy2text - The copy to text.
 * @param {string} props.translation.copy2success - The copy to success message.
 *
 * @returns {JSX.Element} - The JSX representation of the content page element.
 *
 * @constructor
 */
function ContentPageElement({
  content,
  context = "page",
  index = 0,
  translation,
}: Readonly<{
  content: Content[];
  context: PageContext;
  index?: number;
  translation: { copy2text: string; copy2success: string };
}>): React.JSX.Element {
  return (
    <div key={index}>
      {content?.map((contentElement: Content, index: number) => {
        return generateContentElement(
          contentElement,
          context,
          index,
          translation,
        );
      })}
    </div>
  );
}

export default ContentPageElement;
