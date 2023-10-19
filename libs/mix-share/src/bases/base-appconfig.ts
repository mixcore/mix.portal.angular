import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { DataType, DataTypeUi } from '@mixcore/lib/model';
import { MixFormlyArrayMediaComponent } from '@mixcore/ui/array-media';
import { MixFormlyArrayRadioComponent } from '@mixcore/ui/array-radio';
import { MixFormlyColorPickerComponent } from '@mixcore/ui/color-picker';
import { MixFormlyDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixFormlyDateTimePickerComponent } from '@mixcore/ui/date-time-picker';
import { MixFormlyRichTextComponent } from '@mixcore/ui/editor';
import { MixFormlyInputComponent } from '@mixcore/ui/input';
import { MixFormlyInputNumberComponent } from '@mixcore/ui/input-number';
import { JsonEditorFormlyComponent } from '@mixcore/ui/json';
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
  translocoConfig,
} from '@ngneat/transloco';
import { FormlyModule } from '@ngx-formly/core';
import { TUI_ANIMATIONS_DURATION, TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { ERROR_MAP, errorMap } from '../form';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export const FormlyImportModule = FormlyModule.forRoot({
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
});

export const ToastImportModule = HotToastModule.forRoot({
  position: 'top-center',
});

export const BaseAppProvider = [
  {
    provide: NgZone,
    useValue: new NgZone({
      shouldCoalesceEventChangeDetection: true,
      shouldCoalesceRunChangeDetection: true,
    }),
  },

  {
    provide: ERROR_MAP,
    useValue: errorMap,
  },
  {
    provide: TUI_ANIMATIONS_DURATION,
    useValue: 100,
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
  }),
  {
    provide: TUI_SANITIZER,
    useClass: NgDompurifySanitizer,
  },
];
