import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MixColumn, MixDatabase } from '@mixcore/lib/model';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { EntityFormComponent } from '../../../../components/entity-form/entity-form.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';

@Component({
  selector: 'mix-database-detail',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    TuiTabsModule,
    MixButtonComponent,
    MixTextAreaComponent,
    MixEditorComponent,
    FormsModule,
    TuiScrollbarModule,
    TuiLoaderModule,
    ReactiveFormsModule,
    MixSelectComponent,
    TuiToggleModule,
    EntityFormComponent,
    MixFormErrorComponent,
  ],
  templateUrl: './database-detail.component.html',
  styleUrls: ['./database-detail.component.scss'],
})
export class DatabaseDetailComponent extends DetailPageKit implements OnInit {
  public data: MixDatabase | undefined = undefined;
  public form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    systemName: new FormControl('', Validators.required),
    description: new FormControl(''),
    dataTye: new FormControl(''),
  });

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];

        if (!this.id || this.id === 'create') {
          this.mode = 'create';
          return;
        }

        this.mode = 'update';
        this.mixApi.databaseApi
          .getById(this.id)
          .pipe(this.observerLoadingState())
          .subscribe((v) => {
            this.data = v;
            this.form.patchValue(v);
          });
      });
  }

  entityChange(entity: MixColumn, index: number) {
    if (!this.data) return;

    this.data.columns[index] = {
      ...this.data?.columns[index],
      ...entity,
    };
  }

  submit(): void {
    if (FormHelper.validateForm(this.form)) {
      console.log(this.data);

      this.mixApi.databaseApi
        .save({
          ...this.data,
          ...(this.form.value as MixDatabase),
        })
        .pipe(this.observerLoadingState())
        .subscribe({
          next: (value) => {
            if (this.mode === 'create') {
              this.data = value;
              this.mode = 'update';
            }
          },
        });
    }
  }
}
