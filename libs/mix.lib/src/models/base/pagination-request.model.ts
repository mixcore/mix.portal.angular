export interface MixGraphQLModel {
  columns?: string;
}

export interface PaginationRequestModel extends MixGraphQLModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  searchColumns?: string;
  searchMethod?: SearchMethod;
}

export type SearchMethod = 'Like';
