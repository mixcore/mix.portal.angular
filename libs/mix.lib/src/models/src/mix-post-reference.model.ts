import { MixContentStatus } from '../../enums';

export interface MixPostReferenceModel {
  createdBy: string;
  createdDateTime: Date;
  id: number;
  image?: string;
  isActived: boolean;
  lastModified: Date;
  modifiedBy: string;
  moduleId: number;
  pageId: number;
  priority: number;
  specificulture: string;
  status: MixContentStatus;
}
