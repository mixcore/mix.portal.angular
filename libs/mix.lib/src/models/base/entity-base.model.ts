import { MixContentStatus } from '../../enums';

export interface IEntityBase<T> {
  id: T;
  createdDateTime: Date;
  lastModified: Date;
  createdBy: string;
  modifiedBy: string;
  priority: number;
  status: MixContentStatus;
  isDeleted: boolean;
}
