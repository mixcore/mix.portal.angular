import { DatabaseApiDictionary } from './mix-database.dictionary';
import { ModuleApiDictionary } from './module-api.dictionary';
import { PageApiDictionary } from './page-api.dictionary';
import { PostApiDictionary } from './post-api.dictionary';
import {
  PagePostApiDictionary,
  PostPostApiDictionary
} from './reference-table.dictionary';
import { ShareApiDictionary } from './share-api.dictionary';
import { TemplateApiDictionary } from './template-api.dictionary';
import { TenancyApiDictionary } from './tenancy-api.dictionary';
import { ThemeApiDictionary } from './theme-api.dictionary';

export class MixApiDictionary {
  public PostApi: PostApiDictionary = new PostApiDictionary();
  public PageApi: PageApiDictionary = new PageApiDictionary();
  public ShareApi: ShareApiDictionary = new ShareApiDictionary();
  public ModuleApi: ModuleApiDictionary = new ModuleApiDictionary();
  public TenancyApi: TenancyApiDictionary = new TenancyApiDictionary();
  public DatabaseApi: DatabaseApiDictionary = new DatabaseApiDictionary();
  public ThemeApi: ThemeApiDictionary = new ThemeApiDictionary();
  public TemplateApi: TemplateApiDictionary = new TemplateApiDictionary();

  // reference table
  public PostPostApi: PostPostApiDictionary = new PostPostApiDictionary();
  public PagePostApi: PagePostApiDictionary = new PagePostApiDictionary();
}

export const MixApiDict = new MixApiDictionary();
