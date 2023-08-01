import { GetModuleDataRequest, MixModuleData } from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { MixRestfulApi } from './mix-crud-api.service';

export class MixModuleDataApi extends MixRestfulApi<
  MixModuleData,
  GetModuleDataRequest
> {
  public initForm(moduleId: number): Observable<MixModuleData> {
    return this.get(MixSwagger.content.moduleData + '/init-form/' + moduleId);
  }
}
