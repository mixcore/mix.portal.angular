import { MixDatabaseModel } from './mix-database.model';
import { MixModulePortalModel } from './mix-module.model';
import { MixPagePortalModel } from './mix-page.model';
import { MixPostPortalModel } from './mix-post.model';

export interface MixSiteDataModel {
  posts: MixPostPortalModel[];
  pages: MixPagePortalModel[];
  modules: MixModulePortalModel[];
  mixDatabases: MixDatabaseModel[];
  themeName: string;
  themeSystemName: string;
}
