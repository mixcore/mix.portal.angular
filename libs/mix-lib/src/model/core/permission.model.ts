import { MixContentStatus } from '../mix-status.model';

export interface MixPermission {
  title: string;
  type: string;
  mixTenantId: number;
  id: number;
  createdDateTime: string;
  lastModified: string;
  createdBy: string;
  modifiedBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
}

export interface MixPermissionEndpoint {
  id: number;
  createdDateTime: string;
  lastModified: string;
  createdBy: string;
  modifiedBy: string;
  path: string;
  status: MixContentStatus;
  title: string;
}
