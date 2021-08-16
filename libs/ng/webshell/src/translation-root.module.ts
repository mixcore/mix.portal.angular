import { Injectable, NgModule } from '@angular/core';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, Translation, TranslocoLoader, TranslocoModule, translocoConfig } from '@ngneat/transloco';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AVAILABLE_LANGS: { id: string; label: string }[] = [
  {
    id: 'vi',
    label: 'Tiếng Việt'
  },
  {
    id: 'en',
    label: 'English'
  }
];

export const getI18nextLng = (availableLang: string[], defaultLng: string) => {
  const lng: string | null = localStorage.getItem('i18nextLng');
  if (lng && availableLang.includes(lng)) {
    return lng;
  }

  return defaultLng;
};

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: AVAILABLE_LANGS,
        defaultLang: getI18nextLng(['en', 'vi'], 'en'),
        reRenderOnLangChange: true,
        prodMode: true
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
