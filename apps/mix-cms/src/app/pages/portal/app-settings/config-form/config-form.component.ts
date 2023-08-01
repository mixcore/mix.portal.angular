import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataType, MixDynamicDataValue, MixSettings } from '@mixcore/lib/model';
import {
  MixApiFacadeService,
  deleteFileFn,
  uploadFileFn,
} from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { HotToastService } from '@ngneat/hot-toast';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TuiLoaderModule } from '@taiga-ui/core';
import { combineLatest, debounceTime, startWith, tap } from 'rxjs';
import { MixSubToolbarComponent } from '../../../../components/sub-toolbar/sub-toolbar.component';

@Component({
  selector: 'mix-config-form',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    TuiLoaderModule,
    MixButtonComponent,
    MixInputComponent,
    MixSelectComponent,
    ReactiveFormsModule,
    FormlyModule,
  ],
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
})
export class ConfigFormComponent extends BaseComponent {
  activatedRoute = inject(ActivatedRoute);
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  location = inject(Location);

  mode: 'create' | 'update' = 'create';
  dataTypeOptions = Utils.SUPPORTED_DATA_TYPE;
  categoryOptions = ['Common', 'Version', 'Site'];
  id?: number;
  data?: MixSettings;
  form = new FormGroup({
    dataType: new FormControl(DataType.Text),
    displayName: new FormControl('', Validators.required),
    systemName: new FormControl('', Validators.required),
    category: new FormControl('Site'),
    description: new FormControl(),
  });
  valueData = {
    value: <MixDynamicDataValue>null,
  };
  fields: FormlyFieldConfig[] = [];
  valueForm = new FormGroup({});

  constructor() {
    super();

    this.form.controls.dataType.valueChanges
      .pipe(startWith(DataType.Text), takeUntilDestroyed())
      .subscribe((v: DataType | null) => {
        if (!v) return;

        this.valueData.value = Utils.initFormFieldDefaultValue(
          v,
          this.valueData.value
        );

        this.fields = [
          {
            key: 'value',
            type: v,
            props: {
              label: 'Value',
              uploadFn: uploadFileFn(this.mixApi),
              deleteFileFn: deleteFileFn(this.mixApi),
            },
          },
        ];
      });

    combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
      .pipe(debounceTime(100), takeUntilDestroyed())
      .subscribe(([v]) => {
        this.id = v['id'];

        if (this.id?.toString() === 'create') {
          this.mode = 'create';
          this.mixApi.appSettingApi
            .getDefault()
            .pipe(this.observerLoadingStateSignal())
            .subscribe((v) => {
              this.data = v;
            });
        } else {
          if (this.id === undefined) return;

          this.mode = 'update';
          this.mixApi.appSettingApi
            .getById(this.id)
            .pipe(this.observerLoadingStateSignal())
            .subscribe((v) => {
              this.data = v;
              this.valueData.value = v.content;
              this.form.patchValue(v);
            });
        }
      });
  }

  public onSubmit(): void {
    this.mixApi.appSettingApi
      .save(<MixSettings>{
        ...this.data,
        ...(this.form.value as MixSettings),
        content: this.valueData.value,
      })

      .pipe(
        this.observerLoadingStateSignal(),
        this.toast.observe({
          error: `Something error, please try again later`,
        }),
        tap((value) => {
          if (this.mode === 'create') {
            this.mode = 'update';
            this.form.patchValue(value);
          }
        })
      )
      .subscribe();
  }
}
