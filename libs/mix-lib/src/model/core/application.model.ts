export interface MixApplication {
  baseHref: string;
  appSettings: AppSettings;
  detailUrl: string;
  displayName: string;
  mixTenantId: number;
  id: number;
  createdDateTime: string;
  createdBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
  modifiedEntities: any[];
}

export interface AppSettings {}
