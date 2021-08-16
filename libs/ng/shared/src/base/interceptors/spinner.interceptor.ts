import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ISpinnerCallback, SPINNER_CALLBACK } from '../../constants';
import { Injectable, Injector } from '@angular/core';

import { BaseInterceptor } from '../base-interceptor';
import { CORE_SHOULD_SHOW_SPINNER } from '../base-backend.service';
import { InterceptorType } from '../interceptor-registry';
import { Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.Spinner;
  private _shouldShowSpinner: boolean = true;
  private _spinnerCallback: ISpinnerCallback | null = null;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._shouldShowSpinner) {
      this._spinnerCallback = this.injector.get(SPINNER_CALLBACK, null);

      if (this._spinnerCallback) {
        this._spinnerCallback.show();
      }

      return next.handle(req);
    }

    return next.handle(req);
  }

  protected processHeaders(headers: HttpHeaders): void {
    this._shouldShowSpinner = headers.get(CORE_SHOULD_SHOW_SPINNER) === 'true';
  }

  protected finalize(): void {
    if (this._spinnerCallback) {
      this._spinnerCallback.hide();
    }
  }
}
