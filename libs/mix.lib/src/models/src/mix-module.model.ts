import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';

export interface MixModulePortalModel extends IMixPolymopheusContent, IEntityBase<number> {
  template?: string;
  excerpt?: string;
  content?: string;
  views?: number;
  type?: string;
  publishedDateTime?: Date;
  tags?: string;
}
