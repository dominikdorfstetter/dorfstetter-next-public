import { AriaRole, IconType } from "@app/[lng]/components/icon";
import { i18n } from "i18next";

export interface BlogPageAPIResponse {
  data: BlogData;
  meta: Meta;
}

interface Meta {}

interface BlogData {
  id: number;
  attributes: Blog;
}

export interface Blog {
  title: string;
  content: Content[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  date: string;
  teaserText: string;
  coverimage: Coverimage;
  attachments: Attachments;
  links: LinkData[];
  keywords: Keyword[];
  photos: Photos;
}

export interface Keyword {
  id: number;
  keyword: string;
}

export interface LinkData {
  id: number;
  url: string;
  alt: string;
  title: string;
}

interface Photos {
  data: any[];
}

export interface Attachments {
  data: AttachmentData[];
}

export interface AttachmentData {
  id: number;
  attributes: AttachmentsAttributes;
}

export interface AttachmentsAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: any;
  height: any;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Coverimage {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  alternativeText?: any;
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

export interface Content {
  type: ContentType;
  children: ContentElement[];
  level?: HeadlineLevel;
  format?: ListFormat;
  image?: ImageData;
}

export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type ListFormat = "unordered" | "ordered";

export interface ImageData {
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

export interface Formats {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
}

export interface ImageFormat {
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

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface ContentElement {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
  children?: ContentElement[];
}

export type ContentType =
  | "paragraph"
  | "heading"
  | "image"
  | "list"
  | "link"
  | "quote"
  | "code";

export type IconProps = {
  type: IconType;
  aria_role: AriaRole;
  icon_text: string;
  hoverEffect?: boolean;
};
export type LanguageProps = { t: Function; i18n: i18n };
export type TranslationProps = { copy2text: string; copy2success: string };

export interface LinkData {
  id: number;
  url: string;
  alt: string;
  title: string;
}

export interface AttachmentData {
  id: number;
  attributes: AttachmentsAttributes;
}

export interface AttachmentsAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: any;
  height: any;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents the properties for the LinksList component.
 *
 * @typedef {Object} LinksListProps
 * @property {string} lng - The language for the links list.
 * @property {LinkData[]} links - An array of LinkData objects representing the links to be displayed.
 */
export type LinksListProps = Readonly<{
  lng: string;
  links: LinkData[];
}>;

/**
 * Represents a translation response object.
 *
 * @typedef {Object} TranslationResponse
 * @property {LanguageProps} commonTranslation - The translation for common properties.
 * @property {LanguageProps} iconTranslation - The translation for icon properties.
 */
export type TranslationResponse = Readonly<{
  commonTranslation: LanguageProps;
  iconTranslation: LanguageProps;
}>;
