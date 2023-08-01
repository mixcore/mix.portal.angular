import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { BaseApiService, IHttpParamObject } from '../bases';

export class UploadApiService extends BaseApiService {
  public uploadFile(formData: FormData): Observable<string> {
    return this.http.post(this.url + MixSwagger.storage.upload, formData, {
      responseType: 'text',
    });
  }

  public deleteFile(filePath: string): Observable<void> {
    const params: IHttpParamObject = {
      fullPath: filePath,
    };

    return this.delete(MixSwagger.storage.delete, params);
  }
}
