export type LegalTranslation = {
  accept: string;
  acceptAll: string;
  denyAll: string;
  labelFor: string;
  lastUpdated: string;
  close: string;
  save: string;
  userCookie: string;
};

export type LegalAPIResponse = {
  data: LegalObject | LegalObject[];
  meta: Meta;
};
export type LegalGroup = {
  id: number;
  title: string;
  cookie: string;
  items: LegalItem[];
};

export type LegalItem = {
  id: number;
  cookie: string;
  title: string;
  content: any;
};

type Context = {
  title: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
};
type ContextAttributes = {
  id: number;
  attributes: Context;
};
type Contexts = {
  data: ContextAttributes[];
};

type Localizations = {
  data: LocalizationData[];
};

export type LegalData = {
  title: string;
  cookie: string;
  intro: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  groups: LegalGroup[];
  contexts: Contexts;
  localizations: LocalizationData;
};
export type LegalObject = {
  id: number;
  attributes: LegalData;
};
type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
type Meta = {
  pagination: Pagination;
};

export type LocalizationAttributes = {
  title: string;
  cookie: string;
  intro: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};
export type Localization = {
  id: number;
  attributes: LocalizationAttributes;
};
export type LocalizationData = {
  data: Localization[];
};
