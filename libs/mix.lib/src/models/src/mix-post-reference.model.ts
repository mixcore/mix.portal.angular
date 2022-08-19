import { MixContentStatus } from '../../enums';

export interface MixPostReferenceModel {
  id: number;
  status: MixContentStatus;
  parentId: number;
  childId: number;
}
