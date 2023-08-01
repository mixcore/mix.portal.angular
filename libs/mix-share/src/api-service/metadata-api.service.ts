import {
  GetMetadataRequest,
  MetadataAsc,
  MetadataModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { BaseApiService, IHttpParamObject } from '../bases';

export class MetadataService extends BaseApiService {
  public getMetadata(
    request: GetMetadataRequest
  ): Observable<PaginationResultModel<MetadataModel>> {
    return this.get(
      MixSwagger.service.metadata,
      request as unknown as IHttpParamObject
    );
  }

  public getMetadataByContentType(
    contentType: string,
    contentId: number,
    metadataType: string,
    request: GetMetadataRequest
  ): Observable<PaginationResultModel<MetadataAsc>> {
    const query = {
      ...request,
      contentType: contentType,
      contentId: contentId,
      direction: request.direction,
      metadataType: metadataType,
    };
    return this.get(
      `${MixSwagger.service.getMetadata}/${contentType}/${contentId}`,
      query as unknown as IHttpParamObject
    );
  }

  public createMetadataAsc(
    contentId: number,
    contentType: string,
    description: string,
    image: string,
    metadataId: number
  ): Observable<void> {
    const request = {
      contentId,
      contentType,
      description,
      image,
      metadataId,
    };

    return this.post(MixSwagger.service.createMetadataAsc, request);
  }

  public deleteMetadataAsc(metadataAscId: number): Observable<void> {
    return this.delete(
      MixSwagger.service.deleteMetadataAsc + '/' + metadataAscId
    );
  }
}
