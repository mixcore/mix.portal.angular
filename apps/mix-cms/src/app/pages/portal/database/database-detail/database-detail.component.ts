import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
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
import { DatabaseSelectComponent } from '@mixcore/share/components';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import {
  TuiInputInlineModule,
  TuiTabsModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { debounceTime, takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../../app.routes';
import { EntityFormComponent } from '../../../../components/entity-form/entity-form.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';
import { DatabaseStore } from '../../../../stores/database.store';
import { DatabaseEntityComponent } from '../components/database-entity/database-entity.component';
import { DatabaseRelationshipComponent } from '../components/database-relationship/database-relationship.component';

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
    DragDropModule,
    TuiInputInlineModule,
    TuiAutoFocusModule,
    DatabaseSelectComponent,
    DatabaseRelationshipComponent,
    DatabaseEntityComponent,
  ],
  templateUrl: './database-detail.component.html',
  styleUrls: ['./database-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseDetailComponent extends DetailPageKit implements OnInit {
  @ViewChildren(EntityFormComponent)
  entityForms!: QueryList<EntityFormComponent>;

  public toast = inject(HotToastService);
  public router = inject(Router);
  public databaseStore = inject(DatabaseStore);
  public modal = inject(ModalService);
  public zone = inject(NgZone);

  public editTitle = false;
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
        this.data = undefined;
        this.form.reset();

        if (!this.id || this.id === 'create') {
          this.mode = 'create';
          this.data = {
            columns: [],
          } as any;
          return;
        }

        this.mode = 'update';
        this.mixApi.databaseApi
          .getById(this.id)
          .pipe(takeUntil(this.destroy$), this.observerLoadingState())
          .subscribe((v) => {
            this.data = new MixDatabase(v);
            this.form.patchValue(v, { emitEvent: false });
            this.cdr.detectChanges();
          });
      });

    this.form.controls.displayName.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(600))
      .subscribe((value) => {
        if (!value || this.form.value.systemName) return;

        this.updateSystemName(value);
      });
  }

  public submit(): void {
    if (this.entityForms.some((v) => !v.validate())) {
      this.activeTabIndex = 1;
      return;
    }

    if (!FormHelper.validateForm(this.form)) {
      this.activeTabIndex = 0;
      return;
    }

    this.mixApi.databaseApi
      .save({
        ...this.data,
        ...(this.form.value as MixDatabase),
        columns: this.data?.columns,
      })
      .pipe(
        this.toast.observe({
          loading: `${this.mode === 'create' ? 'Creating' : 'Saving'} table`,
          success: 'Successfully applied change',
          error: 'Something error, please try again later.',
        })
      )
      .subscribe({
        next: (value) => {
          if (this.mode === 'create') {
            this.mode = 'update';
          }

          this.databaseStore.reload();
          this.data = new MixDatabase(value);
          this.cdr.detectChanges();
        },
      });
  }

  public selectedTableChange(ev: MixDatabase) {
    if (ev.id == this.id) return;

    this.router.navigateByUrl(
      `${CMS_ROUTES.portal.database.fullPath}/${ev.id}`
    );
  }

  public updateSystemName(value: string) {
    const words = value.split(' ');
    const camelCaseString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const prefix = 'mixDb_';

    this.form.controls.systemName.patchValue(`${prefix}${camelCaseString}`, {
      emitEvent: false,
    });
    this.cdr.detectChanges();
  }

  public toggleEditTitle() {
    this.editTitle = !this.editTitle;
  }

  public onFocusedChange(focused: boolean): void {
    if (!focused) this.editTitle = false;
  }

  public onColumnsChange(columns: MixColumn[]) {
    if (!this.data) return;

    this.data.columns = columns;
  }

  async goDatabaseData(sysName: string) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${sysName}`
    );
  }
}
