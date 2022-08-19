import { BaseMixApiDictionary } from './base-dictionary';

export class PostPostApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-post-post/';
  }
}

export class PagePostApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-page-post/';
  }
}
