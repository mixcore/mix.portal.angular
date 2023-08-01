import { DataType } from './database.model';

export interface MixSettings {
  displayName: string;
  systemName: string;
  content: string;
  category: string;
  dataType: DataType;
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
