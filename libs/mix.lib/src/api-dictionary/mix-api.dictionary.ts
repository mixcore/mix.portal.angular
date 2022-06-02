import { PageApiDictionary } from './page-api.dictionary';
import { PostApiDictionary } from './post-api.dictionary';
import { ShareApiDictionary } from './share-api.dictionary';
import { TenancyApiDictionary } from './tenancy-api.dictionary';

export class MixApiDictionary {
  public PostApi: PostApiDictionary = new PostApiDictionary();
  public PageApi: PageApiDictionary = new PageApiDictionary();
  public ShareApi: ShareApiDictionary = new ShareApiDictionary();
  public TenancyApi: TenancyApiDictionary = new TenancyApiDictionary();
}

export const MixApiDict = new MixApiDictionary();
