import { BaseMixApiDictionary } from './base-dictionary';

export class PostApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-post-content/';
  }
}
