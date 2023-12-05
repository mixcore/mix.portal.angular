import { BaseAuditedEntity } from './base-audited-entity.model';
import { DatabaseProvider } from './database.model';

export interface MixDbContext extends BaseAuditedEntity {
  databaseProvider: DatabaseProvider;
  connectionString: string;
  schema: string;
}

export const DbContextFixId = {
  All: -2,
  MasterDb: -1,
};
