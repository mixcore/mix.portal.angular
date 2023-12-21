import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  ApplicationConfig,
  Injectable,
  NgZone,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DataType, DataTypeUi } from '@mixcore/lib/model';
import { AUTH_ROUTE } from '@mixcore/module/auth';
import {
  AuthInterceptor,
  FULL_MENU,
  PRODUCT_MENU,
  URL_401,
  URL_ERROR,
} from '@mixcore/share/auth';
import { DOMAIN_URL, DOMAIN_URL$ } from '@mixcore/share/base';
import { ERROR_MAP, errorMap } from '@mixcore/share/form';
import { MixFormlyArrayMediaComponent } from '@mixcore/ui/array-media';
import { MixFormlyArrayRadioComponent } from '@mixcore/ui/array-radio';
import { MixFormlyColorPickerComponent } from '@mixcore/ui/color-picker';
import { MixFormlyDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixFormlyDateTimePickerComponent } from '@mixcore/ui/date-time-picker';
import { MixFormlyRichTextComponent } from '@mixcore/ui/editor';
import { MixFormlyInputComponent } from '@mixcore/ui/input';
import { MixFormlyInputNumberComponent } from '@mixcore/ui/input-number';
import { JsonEditorFormlyComponent } from '@mixcore/ui/json';
import { MixModalModule } from '@mixcore/ui/modal';
import { MixFormlyQRCodeComponent } from '@mixcore/ui/qr-code';
import { MixFormlySelectComponent } from '@mixcore/ui/select';
import { MixFormlyTextAreaComponent } from '@mixcore/ui/textarea';
import { MixFormlyToggleComponent } from '@mixcore/ui/toggle';
import { MixFormlyUploadComponent } from '@mixcore/ui/upload';
import {
  popperVariation,
  provideTippyConfig,
  tooltipVariation,
} from '@ngneat/helipopper';
import { HotToastModule } from '@ngneat/hot-toast';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TranslocoModule,
  translocoConfig,
} from '@ngneat/transloco';
import { FormlyModule } from '@ngx-formly/core';
import { TuiPreviewModule } from '@taiga-ui/addon-preview';
import { TuiPortalModule } from '@taiga-ui/cdk';
import {
  TUI_ANIMATIONS_DURATION,
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiPushModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { CMS_ROUTES, ROUTES } from './app.routes';
import { APP_MENU, APP_NOT_SUPPER_ADMIN_MENU } from './shares/consts/app.menu';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

export const domainUrlFactory = () => {
  const url = localStorage.getItem('domainUrl');
  return new BehaviorSubject<string>(url || environment.domainUrl);
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NgZone,
      useValue: new NgZone({
        shouldCoalesceEventChangeDetection: true,
        shouldCoalesceRunChangeDetection: true,
      }),
    },
    importProvidersFrom(
      RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
      BrowserAnimationsModule,
      BrowserModule,
      TuiRootModule,
      MixModalModule,
      TuiAlertModule,
      TuiPreviewModule,
      TuiPortalModule,
      TuiPushModule,
      HttpClientModule,
      MonacoEditorModule.forRoot(),
      HotToastModule.forRoot({
        position: 'top-center',
      }),
      TuiDialogModule,
      FormlyModule.forRoot({
        types: [
          {
            name: DataType.Text,
            component: MixFormlyInputComponent,
            defaultOptions: { props: { type: 'text' } },
          },
          {
            name: DataType.Custom,
            component: MixFormlyInputComponent,
            defaultOptions: { props: { type: 'text' } },
          },
          {
            name: DataType.Url,
            component: MixFormlyInputComponent,
            defaultOptions: { props: { type: 'text' } },
          },
          {
            name: DataType.DateTime,
            component: MixFormlyDateTimePickerComponent,
          },
          { name: DataType.Integer, component: MixFormlyInputNumberComponent },
          { name: DataType.Double, component: MixFormlyInputNumberComponent },
          { name: DataType.Color, component: MixFormlyColorPickerComponent },
          { name: DataTypeUi.TextSelect, component: MixFormlySelectComponent },
          { name: DataType.Upload, component: MixFormlyUploadComponent },
          { name: DataType.Json, component: JsonEditorFormlyComponent },
          { name: DataType.Array, component: JsonEditorFormlyComponent },
          { name: DataType.QRCode, component: MixFormlyQRCodeComponent },
          { name: DataType.Date, component: MixFormlyDatePickerComponent },
          { name: DataType.Boolean, component: MixFormlyToggleComponent },
          { name: DataType.Html, component: MixFormlyRichTextComponent },
          { name: DataType.Html, component: MixFormlyRichTextComponent },
          {
            name: DataType.MultilineText,
            component: MixFormlyTextAreaComponent,
          },

          {
            name: DataType.ArrayMedia,
            component: MixFormlyArrayMediaComponent,
          },
          {
            name: DataType.ArrayRadio,
            component: MixFormlyArrayRadioComponent,
          },
        ],
      }),
      TuiPreviewModule,
      TranslocoModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:20000',
      })
    ),
    {
      provide: DOMAIN_URL,
      useValue: environment.domainUrl,
    },
    {
      provide: DOMAIN_URL$,
      useFactory: domainUrlFactory,
    },
    {
      provide: ERROR_MAP,
      useValue: errorMap,
    },
    {
      provide: URL_401,
      useValue: CMS_ROUTES.auth.login.fullPath,
    },
    {
      provide: URL_ERROR,
      useValue: CMS_ROUTES.error.path,
    },
    {
      provide: AUTH_ROUTE,
      useValue: {
        authRoute: CMS_ROUTES.portal.dashboard.fullPath,
        notAuthRoute: CMS_ROUTES.auth.login.fullPath,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TUI_ANIMATIONS_DURATION,
      useValue: 100,
    },
    {
      provide: FULL_MENU,
      useValue: APP_MENU,
    },
    {
      provide: PRODUCT_MENU,
      useValue: APP_NOT_SUPPER_ADMIN_MENU,
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        failedRetries: 0,
        missingHandler: {
          logMissingKey: false,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
      appendTo: document.body,
    }),
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
};
