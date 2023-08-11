import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MixColumn, MixDatabase } from '@mixcore/lib/model';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { HotToastService } from '@ngneat/hot-toast';
import {
  TuiLoaderModule,
  TuiNotificationModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { debounceTime, takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../../app.routes';
import { EntityFormComponent } from '../../../../components/entity-form/entity-form.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';
import { DatabaseStore } from '../../../../stores/database.store';

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
    TuiNotificationModule,
  ],
  templateUrl: './database-detail.component.html',
  styleUrls: ['./database-detail.component.scss'],
})
export class DatabaseDetailComponent extends DetailPageKit implements OnInit {
  @ViewChildren(EntityFormComponent)
  entityForms!: QueryList<EntityFormComponent>;

  public toast = inject(HotToastService);
  public router = inject(Router);
  public databaseStore = inject(DatabaseStore);
  public data: MixDatabase | undefined = undefined;
  public form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    systemName: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];

        if (!this.id || this.id === 'create') {
          this.mode = 'create';
          this.data = undefined;
          this.form.reset();
          return;
        }

        this.mode = 'update';
        this.mixApi.databaseApi
          .getById(this.id)
          .pipe(takeUntil(this.destroy$), this.observerLoadingState())
          .subscribe((v) => {
            this.data = v;
            this.form.patchValue(v, { emitEvent: false });
          });
      });

    this.form.controls.displayName.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(600))
      .subscribe((value) => {
        if (!value || this.form.value.systemName) return;

        this.updateSystemName(value);
      });
  }

  public addNewEntity(): void {
    if (!this.data) return;
    if (!this.data?.columns?.length) {
      this.data.columns = [new MixColumn({ systemName: 'mixdb__', new: true })];
    } else {
      this.data.columns.push(
        new MixColumn({ systemName: 'mixdb__', new: true })
      );
    }
  }

  public removeEntity(entity: MixColumn, index: number) {
    if (!this.data) return;

    this.data.columns.splice(index, 1);
  }

  public entityChange(entity: MixColumn, index: number) {
    if (!this.data) return;

    this.data.columns[index] = {
      ...this.data?.columns[index],
      ...entity,
    };
  }

  public submit(): void {
    if (this.entityForms.some((v) => !v.validate())) {
      this.activeTabIndex = 1;
      return;
    }

    if (FormHelper.validateForm(this.form)) {
      this.mixApi.databaseApi
        .save({
          ...this.data,
          ...(this.form.value as MixDatabase),
        })
        .pipe(
          this.toast.observe({
            loading: `${this.mode === 'create' ? 'Creating' : 'Saving'} table`,
            success: 'Successfully apply change',
            error: 'Something error, please try again later.',
          })
        )
        .subscribe({
          next: (value) => {
            if (this.mode === 'create') {
              this.databaseStore.reload();
              this.data = value;
              this.mode = 'update';
            }

            this.processAfterSave();
          },
        });
    }
  }

  public processAfterSave() {
    if (this.data)
      this.data.columns = this.data.columns.map((x) => ({
        ...x,
        new: false,
      }));
  }

  public selectedTableChange(id: string | number) {
    if (id == this.id) return;

    this.router.navigateByUrl(`${CMS_ROUTES.portal.database.fullPath}/${id}`);
  }

  public identify(index: number, item: MixColumn) {
    return item.priority;
  }

  public updateSystemName(value: string) {
    const words = value.split(' ');
    const camelCaseString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const prefix = 'mixDb';

    this.form.controls.systemName.patchValue(`${prefix}${camelCaseString}`, {
      emitEvent: false,
    });
  }
}
