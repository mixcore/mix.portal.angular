export interface BaseAuditedEntity {
  createdDateTime?: Date;
  lastModifiedDate?: Date;
  id: number;
  displayName?: string;
  systemName?: string;
  priority?: number;
}
