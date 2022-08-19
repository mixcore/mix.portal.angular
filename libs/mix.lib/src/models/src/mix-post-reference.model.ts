import { MixContentStatus } from '../../enums';

export interface MixPostReferenceModel {
  id: number;
  status: MixContentStatus;
  parentId: number;
  childId: number;
}

export interface MixPageReferenceModel {
  id: number;
  status: MixContentStatus;
  parentId: number;
  childId: number;
}

export interface MixTableReferenceModel {
  id: number;
  parentId: number;
  childId: number;
}
