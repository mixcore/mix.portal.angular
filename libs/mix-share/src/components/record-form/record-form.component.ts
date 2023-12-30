import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixDatabase, MixDynamicData } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixCheckboxComponent } from '@mixcore/ui/checkbox';
import { MixDefaultSkeletonComponent } from '@mixcore/ui/skeleton';
import { DialogRef } from '@ngneat/dialog';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { delay, of, take } from 'rxjs';
import { DatabaseDataStore } from '../../modules/database/store/database-data.store';

@Component({
  selector: 'mix-record-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    MixButtonComponent,
    MixDefaultSkeletonComponent,
    MixCheckboxComponent,
  ],
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RecordFormComponent extends BaseComponent implements OnInit {
  public static windowClass =
    'mix-record-form-dialog top-align-modal interact-modal';
  public static minWidth = '800px';
  public static maxWidth = '95vw';

  public mixApi = inject(MixApiFacadeService);
  public store = inject(DatabaseDataStore);
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
  public continueCreate = new FormControl(true);

  ngOnInit() {
    of(this.ref.data.mixDatabase)
      .pipe(delay(200), this.observerLoadingStateSignal(), take(1))
      .subscribe(() => {
        const db = this.ref.data.mixDatabase;
        this.mode = this.ref.data.data ? 'update' : 'create';
        const data = this.ref.data.data ?? {};

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
      .pipe(this.observerLoadingState())
      .subscribe((result) => {
        if (this.mode === 'create' && this.continueCreate.value) {
          this.store.addData(result);
          this.form.reset();
          return;
        }

        this.ref.close(result);
      });
  }
}
