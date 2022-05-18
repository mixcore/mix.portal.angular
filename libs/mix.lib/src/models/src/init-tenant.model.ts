import { Culture } from "./cultute.model";

export interface InitTenantModel {
  databaseServer: string,
  databasePort: string,
  databaseName: string,
  databaseUser: string,
  databasePassword: string,
  sqliteDbConnectionString: string,
  lang: string,
  databaseProvider: string,
  culture: Culture,
  siteName: string
}