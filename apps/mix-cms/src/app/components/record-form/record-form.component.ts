import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixDatabase, MixDynamicData } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogRef } from '@ngneat/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormlyMixModule } from '../../shares/kits/formly-mix.module';

@Component({
  selector: 'mix-record-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyMixModule,
    MixButtonComponent,
  ],
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFormComponent extends BaseComponent implements OnInit {
  mixApi = inject(MixApiFacadeService);
  ref: DialogRef<
    {
      mixDatabase: MixDatabase;
    },
    MixDynamicData
  > = inject(DialogRef);

  public uploadFileFn = (file: TuiFileLike) => {
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('folder', 'MixContent/StaticFiles');

    return this.mixApi.uploadApi.uploadFile(formData);
  };

  public deleteFileFn = (file: string) => {
    return this.mixApi.uploadApi.deleteFile(file);
  };

  public modelData: MixDynamicData = {};
  public fields: FormlyFieldConfig[] = [];
  public form = new FormGroup({});

  ngOnInit() {
    const db = this.ref.data.mixDatabase;
    const data = {};

    const { model, fields } = Utils.BuildDynamicFormField(
      db.columns,
      data,
      this.uploadFileFn,
      this.deleteFileFn
    );

    this.fields = fields;
    this.modelData = model;
  }

  public onSaveData() {
    const db = this.ref.data.mixDatabase;
    this.mixApi.databaseApi
      .saveData(
        db.systemName,
        this.modelData.id ?? -1,
        {
          ...this.modelData,
          ...this.form.getRawValue(),
        },
        db.displayName
      )
      .pipe(this.observerLoadingState())
      .subscribe((result) => {
        this.ref.close(result);
      });
  }
}
