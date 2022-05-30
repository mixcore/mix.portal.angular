export interface MixGraphQLModel {
  column?: string;
}

export interface PaginationRequestModel extends MixGraphQLModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  searchColumns?: string;
  searchMethod?: string;
}
