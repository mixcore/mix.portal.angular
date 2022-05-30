export interface MixGraphQLModel {
  column?: string;
}

export interface PaginationRequestModel extends MixGraphQLModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  searchColumn?: string;
}
