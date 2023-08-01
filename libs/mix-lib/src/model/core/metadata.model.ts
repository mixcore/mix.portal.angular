import { PaginationRequestModel } from '../pagination-request.model';

export interface MetadataModel {
  type: string;
  content: string;
  seoContent: string;
  mixTenantId: number;
  id: number;
  createdDateTime: string;
  createdBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
  description: string;
}

export interface GetMetadataRequest extends PaginationRequestModel {
  metadataType?: string;
}

export interface MetadataAsc {
  contentType: string;
  contentId: number;
  metadataId: number;
  description: string;
  image: string;
  mixTenantId: number;
  metadata: MetadataModel;
  id: number;
  createdDateTime: string;
  createdBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
}
