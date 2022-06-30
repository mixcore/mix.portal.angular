import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';
import { MixModuleReferenceModel } from './mix-module-reference.model';

export interface MixModulePortalModel
  extends IMixPolymopheusContent,
    IEntityBase<number> {
  template?: string;
  excerpt?: string;
  content?: string;
  views?: number;
  type?: string;
  publishedDateTime?: Date;
  tags?: string;
  moduleNavs?: MixModuleReferenceModel[];
  systemName: string;
}
