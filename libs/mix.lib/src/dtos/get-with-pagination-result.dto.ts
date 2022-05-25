export interface IPaginationResult<T> {
  items: T[];
  pageIndex: number;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPage: number;
}
