import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { BaseApiService } from '../bases';

export class MixSyncApi extends BaseApiService {
  public syncAll(): Observable<void> {
    return this.get(MixSwagger.service.sync);
  }

  public syncProducts(
    productNames: string[],
    isScaleImage = false,
    isSyncPrice = false
  ): Observable<void> {
    const request = {
      isSyncAll: false,
      isSyncPrice: isSyncPrice,
      isScaleImage: isScaleImage,
      productNames: productNames,
    };

    return this.post(MixSwagger.service.sync, request);
  }
}
