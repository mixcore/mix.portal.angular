import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';

export interface MixDatabaseModel
  extends IMixPolymopheusContent,
    IEntityBase<number> {
  publishedDateTime?: Date;
  systemName?: string;
  displayName?: string;
  mixTenantId?: number;
}
