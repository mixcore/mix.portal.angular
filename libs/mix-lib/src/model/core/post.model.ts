import { MixContentStatus } from '../mix-status.model';
import { MixDynamicData } from './database.model';
import { MixTemplate } from './template.model';

export interface MixPost {
  mixDatabaseName: string;
  type: string;
  detailUrl: string;
  urlAliases: string[];
  title: string;
  excerpt: string;
  content: string;
  templateId: number;
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

  kiotVietProduct?: MixKiotVietProduct;
}

export interface Metadata {
  id: number;
  content: string;
  createdBy: string;
  createdDateTime: string;
  isDeleted: boolean;
  mixTenantId: number;
  priority: number;
  seoContent: string;
  status: string;
  type: string;
}

export interface MixPostPost {
  child?: MixPost;
  createdDateTime?: Date;
  parentId: number;
  childId: number;
  id: number;
  status?: MixContentStatus;
  priority?: number;
}

export interface MixKiotVietProduct extends MixDynamicData {
  discountToDate: Date;
  discountFromDate: Date;
  discountPercent: number;
  parentId: number;
}
