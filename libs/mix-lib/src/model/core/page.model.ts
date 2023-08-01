import { MixTemplate } from './template.model';

export interface MixPage {
  mixDatabaseName: string;
  type: string;
  detailUrl: string;
  urlAliases: string[];
  title: string;
  excerpt: string;
  content: string;
  layoutId: number;
  templateId: number;
  layout: MixTemplate;
  template: MixTemplate;
  image: string;
  seoKeywords: string;
  seoName: string;
  seoTitle: string;
  seoDescription: string;
  mixTenantId: number;
  isPublic: boolean;
  specificulture: string;
  parentId: number;
  mixCultureId: number;
  id: number;
  createdDateTime: string;
  createdBy: string;
  priority: number;
  status: string;
  isValid: boolean;
  errors: string[];
  pageSize: number;
  cssClass: string;
  source: string;
}
