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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MixColumn, MixDatabase, MixRelationShip } from '@mixcore/lib/model';
import { DatabaseSelectComponent } from '@mixcore/share/components';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInlineInputComponent } from '@mixcore/ui/inline-input';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixSelectComponent } from '@mixcore/ui/select';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../../app.routes';
import { EntityFormComponent } from '../../../../components/entity-form/entity-form.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';
import { DatabaseStore } from '../../../../stores/database.store';
import { DatabaseEntityComponent } from '../components/database-entity/database-entity.component';
import { DatabaseInfoComponent } from '../components/database-info/database-info.component';
import { DatabaseRelationshipComponent } from '../components/database-relationship/database-relationship.component';

@Component({
  selector: 'mix-database-detail',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    TuiTabsModule,
    MixButtonComponent,
    TuiLoaderModule,
    ReactiveFormsModule,
    MixSelectComponent,
    EntityFormComponent,
    MixFormErrorComponent,
    DatabaseSelectComponent,
    DatabaseRelationshipComponent,
    DatabaseEntityComponent,
    DatabaseInfoComponent,
    MixInlineInputComponent,
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

  public onRelationshipChange(value: Partial<MixRelationShip>[]) {
    if (this.data) this.data.relationships = value as MixRelationShip[];
  }

  public onDeleteRelationship(value: Partial<MixRelationShip>) {
    this.modal.asKForAction('Are you sure to delete this referrence?', () => {
      this.mixApi.databaseRelation
        .deleteById(value.id as number)
        .pipe(toastObserverProcessing(this.toast))
        .subscribe({
          next: () => {
            this.data!.relationships = this.data!.relationships.filter(
              (x) => x.id !== value.id
            );
            this.cdr.detectChanges();
          },
        });
    });
  }

  async goDatabaseData(sysName: string) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${sysName}`
    );
  }
}
