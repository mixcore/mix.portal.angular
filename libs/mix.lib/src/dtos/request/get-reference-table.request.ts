import { PaginationRequestModel } from '../../models';

export interface IGetReferenceTableRequest extends PaginationRequestModel {
  parentId?: number;
  childId?: number;
}
