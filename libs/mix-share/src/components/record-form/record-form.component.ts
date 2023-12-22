import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixDatabase, MixDynamicData } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDefaultSkeletonComponent } from '@mixcore/ui/skeleton';
import { DialogRef } from '@ngneat/dialog';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { delay, of } from 'rxjs';

@Component({
  selector: 'mix-record-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    MixButtonComponent,
    MixDefaultSkeletonComponent,
  ],
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RecordFormComponent extends BaseComponent implements OnInit {
  public static windowClass = 'mix-record-form-dialog top-align-modal';
  public static minWidth = '800px';
  public static maxWidth = '95vw';

  public mixApi = inject(MixApiFacadeService);
  public ref: DialogRef<
    {
      mixDatabase: MixDatabase;
      data: MixDynamicData | undefined;
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
  public mode: 'create' | 'update' = 'create';

  ngOnInit() {
    of(this.ref.data.mixDatabase)
      .pipe(delay(300), this.observerLoadingStateSignal())
      .subscribe(() => {
        const db = this.ref.data.mixDatabase;
        const data = this.ref.data.data ?? {};
        this.mode = data ? 'update' : 'create';

        const { model, fields } = Utils.BuildDynamicFormField(
          db.columns,
          data,
          this.uploadFileFn,
          this.deleteFileFn
        );

        this.fields = fields;
        this.modelData = model;
      });
  }

  public onSaveData() {
    const db = this.ref.data.mixDatabase;
    const value = {
      ...this.modelData,
      ...this.form.getRawValue(),
    };

    this.mixApi.databaseApi
      .saveData(db.systemName, this.modelData.id ?? -1, value, db.displayName)
      .pipe(this.observerLoadingStateSignal())
      .subscribe((result) => {
        this.ref.close(value);
      });
  }
}
