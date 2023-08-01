import { MixContentStatus } from '../mix-status.model';
import { PaginationRequestModel } from '../pagination-request.model';
import { MixColumn, MixDynamicData } from './database.model';
import { MixTemplate } from './template.model';

export interface MixModule {
  systemName: string;
  type: string;
  simpleDataColumns: string;
  columns: MixColumn[];
  title: string;
  templateId: number;
  template: MixTemplate;
  image: string;
  mixTenantId: number;
  isPublic: boolean;
  specificulture: string;
  parentId: number;
  mixCultureId: number;
  id: number;
  createdDateTime: string;
  createdBy: string;
  modifiedBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
}

export interface MixModuleData {
  id: number;
  status: MixContentStatus;
  data: MixDynamicData;
  columns: MixColumn[];
}

export interface GetModuleDataRequest extends PaginationRequestModel {
  moduleContentId: number;
}
