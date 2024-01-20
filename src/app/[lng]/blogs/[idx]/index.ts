export interface BlogsAPIResponse {
  data: BlogData[];
  meta: Meta;
}

export interface Meta {
  pagination: PaginationResponse;
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface BlogData {
  id: number;
  attributes: Blog;
}

export interface Blog {
  title: string;
  author: string;
  date: string;
  teaserText: string;
  coverimage: CoverImage;
}

export interface CoverImage {
  data: ImageData;
}

export interface ImageData {
  id: number;
  attributes: Image;
}

export interface Image {
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
