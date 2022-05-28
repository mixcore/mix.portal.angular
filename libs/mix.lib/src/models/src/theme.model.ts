import { Culture } from './cultute.model';

export interface ThemeModel {
  id: string;
  title: string;
  description: string | undefined;
  thumbnailImg: string;
  imageUrl: string;
  createdBy: string;
  content: string;
  excerpt?: string;
  specificulture: string;
  cultures?: Culture;
  template: string;
  thumbnail: string;
  image: string;
  icon?: string;
  seoName: string;
  seoTitle: string;
  seoDescription?: string;
  seoKeywords: string;
  source?: string;
  views?: string;
  type: string;
  publishedDateTime?: Date;
  createdDateTime: Date;
  modifiedBy: string;
  lastModified: Date;
  priority: number;
  status: string;
  detailsUrl: string;
  domain: string;
  thumbnailUrl: string;
  templatePath: string;
  additionalData: ThemeAdditionalData;
}

export interface ThemeAdditionalData {
  id: string;
  source: string;
  installCount: number;
  testedMixcoreVersions?: string;
  license?: string;
  banner_cta_url: string;
  activeInstallations: number;
  version: number;
  mixcore_versions: string;
  specialPrice: number;
  previewLink?: string;
  contributorsLink: string;
  specialPriceDuration?: string;
  author: string;
  gitLink?: string;
  viewCount: number;
  ratings: string[];
  description?: string;
  aspnetCoreVersion: number;
  name: string;
  price: number;
  licenseLink?: string;
  authorLink?: string;
  screenshots?: string;
}
