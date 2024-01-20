import {Content} from "@app/[lng]/components/shared/content.element";

export interface PageAPIResponse {
    data: PageData | PageData[];
    meta: Meta;
}

interface Meta {
    pagination: Pagination;
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface PageData {
    id: number;
    attributes: PageAttributes;
}

interface PageAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    pageContent: PageContent;
    localizations?: Localizations;
}

export interface Localizations {
    data: LocalizationData[];
}

export interface LocalizationData {
    id: number;
    attributes: LocalizationAttributes;
}

export interface LocalizationAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface PageContent {
    id: number;
    content: Content[];
    title: string;
    route: string;
    locale: string;
    keywords: Keyword[];
    context: Context;
}

export interface Keyword {
    id: number;
    keyword: string;
}

interface Context {
    data: ContextData;
}

interface ContextData {
    id: number;
    attributes: ContextAttributes;
}

interface ContextAttributes {
    title: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
}