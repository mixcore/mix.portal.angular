export class PaginationModel {
  public pageIndex = 0;
  public page?: number;
  public pageSize?: number;
  public total?: number;
  public totalPage?: number;
}

export interface PaginationResultModel<T> {
  items: T[];
  pagingData: PaginationModel;
}
