import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixDynamicData, MixModuleData } from '@mixcore/lib/model';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { MixSubToolbarComponent } from '../../../../components/sub-toolbar/sub-toolbar.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';

@Component({
  selector: 'mix-module-data-detail',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    TuiLoaderModule,
    FormlyModule,
    ReactiveFormsModule,
  ],
  templateUrl: './module-data-detail.component.html',
  styleUrls: ['./module-data-detail.component.scss'],
})
export class ModuleDataDetailComponent extends DetailPageKit {
  moduleId?: number;
  dataId?: number;
  moduleData?: MixModuleData;

  modelData: MixDynamicData = {};
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});

  public uploadFileFn = (file: TuiFileLike) => {
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('folder', 'MixContent/StaticFiles');

    return this.mixApi.uploadApi.uploadFile(formData);
  };

  public deleteFileFn = (file: string) => {
    return this.mixApi.uploadApi.deleteFile(file);
  };

  constructor() {
    super();

    this.activeRoute.params.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.moduleId = v['id'];
      this.dataId = v['dataId'];

      if (this.dataId?.toString() === 'create') {
        this.mode = 'create';
      } else {
        this.mode = 'update';
      }

      this.loadModuleData();
    });
  }

  public loadModuleData() {
    if (!this.dataId || !this.moduleId) return;

    this.mixApi.moduleDataApi.initForm(this.moduleId).subscribe({
      next: (data) => {
        this.moduleData = data;
        const value = {};
        const { model, fields } = Utils.BuildDynamicFormField(
          this.moduleData.columns,
          value,
          this.uploadFileFn,
          this.deleteFileFn
        );

        this.modelData = model;
        this.fields = fields;

        if (this.mode === 'update' && this.dataId !== undefined) {
          this.mixApi.moduleDataApi.getById(this.dataId).subscribe({
            next: (value) => {
              this.moduleData = value;
              const formValue = {};
              Object.keys(value.data).forEach((key) => {
                (formValue as any)[key] = (value.data[key] as any)?.value;
              });

              const { model, fields } = Utils.BuildDynamicFormField(
                data.columns,
                formValue,
                this.uploadFileFn,
                this.deleteFileFn
              );

              this.modelData = model;
              this.fields = fields;
            },
          });
        }
      },
    });
  }

  public submitData() {
    const data = {};
    Object.keys(this.modelData).forEach((key) => {
      (data as any)[key] = {};
      (data as any)[key]['value'] = this.modelData[key];
    });

    this.mixApi.moduleDataApi
      .save({
        ...this.moduleData,
        data: data,
      })
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: () => {
          if (this.mode === 'create') this.mode = 'update';
        },
      });
  }
}
