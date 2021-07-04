import { AUTH_TOKEN_CALLBACK, ERROR_HANDLING_CALLBACK, HttpStatusCode, SPINNER_CALLBACK, SpinnerStore } from '@coreng/angular-core';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { APP_BASE_HREF } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Provider } from '@angular/core';

export const nzDefaultLangProvider: Provider = { provide: NZ_I18N, useValue: vi_VN };

export const baseHrefProvider: Provider = { provide: APP_BASE_HREF, useValue: '' };

export const authTokenProvider: Provider = {
  provide: AUTH_TOKEN_CALLBACK,
  useFactory: () => () => {
    const oidc: string | null = localStorage.getItem('hulk:oidc:user');

    if (!oidc) {
      return '';
    }

    // Bypass this rule because of un-needed type declaration.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return JSON.parse(oidc).access_token as string;
  }
};

export const errorHandlingProvider: Provider = {
  provide: ERROR_HANDLING_CALLBACK,
  useFactory: (modal: NzModalService) => (response: HttpErrorResponse) => {
    switch (response.status) {
      case HttpStatusCode.Unauthorized:
        modal.error({ nzTitle: 'Lỗi', nzContent: 'Unauthorized' });
        break;
      case HttpStatusCode.Forbidden:
        modal.error({ nzTitle: 'Lỗi', nzContent: 'Forbidden' });
        break;
      case HttpStatusCode.BadRequest:
        modal.error({ nzTitle: 'Lỗi', nzContent: 'BadRequest' });
        break;
      case HttpStatusCode.BadGateway:
        modal.error({ nzTitle: 'Lỗi', nzContent: 'BadGateway' });
        break;
      case HttpStatusCode.NotFound:
        modal.error({ nzTitle: 'Lỗi', nzContent: 'NotFound' });
        break;
      default:
        break;
    }
  },
  deps: [NzModalService]
};

export const spinnerProvider: Provider = {
  provide: SPINNER_CALLBACK,
  useFactory: (store: SpinnerStore) => {
    return {
      show: store.show.bind(store),
      hide: store.hide.bind(store)
    };
  },
  deps: [SpinnerStore]
};
