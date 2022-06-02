import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';
import { ISeoBase } from '../base/seo-base.model';

export interface MixPagePortalModel extends IMixPolymopheusContent, IEntityBase<number>, ISeoBase {
  template?: string;
  excerpt?: string;
  content?: string;
  views?: number;
  type?: string;
  publishedDateTime?: Date;
  tags?: string;
}
