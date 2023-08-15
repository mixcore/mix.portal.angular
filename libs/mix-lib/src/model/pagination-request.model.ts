export interface MixGraphQLModel {
  columns?: string;
}

export interface PaginationRequestModel extends MixGraphQLModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  searchColumns?: string | string[];
  searchMethod?: SearchMethod;
  direction?: 'Asc' | 'Desc';
  parentId?: number;
  guidParentId?: string;
  parentName?: string;
  orderBy?: string;
  status?: string;
  filters?: {
    [key: string]: any;
  };
  queries?: MixFilter[];
  metadataQueries?: MixFilter[];
  loadNestedData?: boolean;
  mixDatabaseName?: string;
}

export type SearchMethod = 'Like' | 'In' | 'InRange' | 'Equal';
export type CompareOperator =
  | 'Like'
  | 'Equal'
  | 'NotEqual'
  | 'LessThanOrEqual'
  | 'LessThan'
  | 'GreaterThan'
  | 'GreaterThanOrEqual'
  | 'Contain'
  | 'NotContain'
  | 'InRange';

export interface MixFilter {
  fieldName: string;
  value: string | number | null | Date;
  compareOperator: CompareOperator;
  isRequired?: boolean;
  displayName?: string;
  options?: string[];
  type?: 'select' | 'date';
}
