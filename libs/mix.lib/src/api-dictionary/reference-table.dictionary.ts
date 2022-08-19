import { BaseMixApiDictionary } from './base-dictionary';

export class PostPostApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-post-post/';
  }

  public get searchEndpoint() {
    return this.url + 'search';
  }
}

export class PageModuleApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-page-module/';
  }

  public get searchEndpoint() {
    return this.url + 'search';
  }
}
