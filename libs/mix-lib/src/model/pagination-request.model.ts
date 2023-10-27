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

export const CompareOperatorDisplay: Record<CompareOperator, string> = {
  Like: 'Like',
  InRange: 'In Range',
  Equal: 'Equal',
  NotEqual: 'Not Equal',
  LessThanOrEqual: 'Less Than Or Equal',
  LessThan: 'Less Than',
  GreaterThan: 'Greater Than',
  GreaterThanOrEqual: 'Greater Than Or Equal',
  Contain: 'Contain',
  NotContain: 'Not Contain',
};

export interface MixFilter {
  fieldName: string;
  value: string | number | null | Date;
  compareOperator: CompareOperator;
  isRequired?: boolean;
  displayName?: string;
  options?: string[];
  type?: 'select' | 'date';
}

export const buildCacheKey = (
  request: PaginationRequestModel,
  prefix: string
) => {
  return `${prefix}-${request.pageIndex}-${request.pageSize}-${request.status}-${request.direction}-${request.keyword}-${request.orderBy}`;
};
