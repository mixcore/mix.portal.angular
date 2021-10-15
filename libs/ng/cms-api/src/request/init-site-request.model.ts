import { Culture, DatabaseType } from '@mix-portal/ng/shared';

export interface IInitSiteRequest {
  siteName: string;
  databaseProvider: DatabaseType;
  databaseServer?: string;
  databasePort?: string;
  databaseName?: string;
  databaseUser?: string;
  databasePassword?: string;
  sqliteDbConnectionString?: string;
  lang: string;
  culture: Culture;
}
