import { MixDataType } from '../../enums';
import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';

export interface MixDatabaseModel
  extends IMixPolymopheusContent,
    IEntityBase<number> {
  publishedDateTime?: Date;
  systemName?: string;
  displayName?: string;
  mixTenantId?: number;
  type: 'System';
  columns?: MixDatabaseColumnModel[];
}

export interface MixDatabaseColumnModel extends IEntityBase<number> {
  publishedDateTime?: Date;
  systemName?: string;
  displayName?: string;
  mixDatabaseId: number;
  columnConfigurations: MixDatabaseColumnConfiguration;
  dataType?: MixDataType;
}

export interface MixDatabaseColumnConfiguration {
  isEncrypt: boolean;
}
