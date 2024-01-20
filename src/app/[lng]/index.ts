export interface StartPageAPIResponse {
    data: StartPageData;
    meta: Meta;
}

export interface Meta {
}

export interface StartPageData {
    id: number;
    attributes: StartPageAttributes;
}

export interface StartPageAttributes {
    title: string;
    introduction: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    photo: PhotoInterface;
    sections: Section[];
}

export interface Section {
    id: number;
    title: string;
    text: string;
    coverimage: CoverImage;
    callToActionRoute: string;
}

export interface CoverImage {
    id: number;
    data: Data;
}

export interface PhotoInterface {
    data: Data;
}

export interface Data {
    id: number;
    attributes: PhotoData;
}

export interface PhotoData {
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

export interface Formats {
    thumbnail: Thumbnail;
    small: Thumbnail;
    medium: Thumbnail;
    large: Thumbnail;
}

export interface Thumbnail {
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
