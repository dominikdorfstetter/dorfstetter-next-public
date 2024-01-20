export interface CVAPIResponse {
  data: Data;
  meta?: any;
}

export interface Data {
  id: number;
  attributes: CV;
}

export interface CV {
  title: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  cv?: CVEntry[];
}

export interface CVEntry {
  id: number;
  position: string;
  company: string;
  url?: string;
  from: Date;
  to?: Date;
  location: string;
  skills?: Skill[];
}

export interface Skill {
  id: number;
  title: string;
}

export type CVPageParams = Readonly<{
  lng: string;
}>;

export type CVPageProps = Readonly<{
  params: CVPageParams;
}>;
