import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';

@Directive()
export class DetailPageKit extends BaseComponent {
  public destroyRef = inject(DestroyRef);
  public location = inject(Location);
  public cdr = inject(ChangeDetectorRef);
  public mixApi = inject(MixApiFacadeService);
  public activeRoute = inject(ActivatedRoute);
  public activeTabIndex = 0;
  public id = undefined;
  public mode: 'create' | 'update' = 'create';

  public goBack(): void {
    this.location.back();
  }
}
