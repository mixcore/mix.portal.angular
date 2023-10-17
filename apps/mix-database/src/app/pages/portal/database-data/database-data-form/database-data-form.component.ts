import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MixDatabase,
  MixDynamicData,
  MixRelationShip,
  PaginationRequestModel,
  RelationShipType,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent, LoadingState } from '@mixcore/share/base';
import {
  DynamicDbListComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiFileLike, TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { combineLatest, debounceTime, forkJoin, of, switchMap } from 'rxjs';
import { CMS_ROUTES } from '../../../../app.routes';
import { BasicMixFilterComponent } from '../../../../components/basic-mix-filter/basic-mix-filter.component';
import { FormlyMixModule } from '../../../../shares/kits/formly-mix.module';

@Component({
  selector: 'mix-database-data-form',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabsModule,
    MixButtonComponent,
    FormsModule,
    TuiScrollbarModule,
    TuiLoaderModule,
    ReactiveFormsModule,
    TuiToggleModule,
    FormlyMixModule,
    MixSubToolbarComponent,
    DynamicDbListComponent,
    BasicMixFilterComponent,
  ],
  templateUrl: './database-data-form.component.html',
  styleUrls: ['./database-data-form.component.scss'],
})
export class DatabaseDataFormComponent extends BaseComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);
  location = inject(Location);
  activeTabIndex = 0;
  dbSysName = '';
  dbId = 0;
  db: MixDatabase | undefined = undefined;
  mode: 'update' | 'create' = 'update';
  modelData: MixDynamicData = {};
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  relationshipDbs: MixRelationShip[] = [];
  filterValue = <PaginationRequestModel>{
    orderBy: 'priority',
    direction: 'Desc',
  };

  parentId: number | undefined = undefined;
  parentDbName: string | undefined = undefined;

  uploadFileFn = (file: TuiFileLike) => {
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

    combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
      .pipe(debounceTime(100), takeUntilDestroyed())
      .subscribe(([v]) => {
        this.dbSysName = v['databaseSysName'];
        this.dbId = v['id'];

        let request;
        if (this.dbId.toString() === 'create') {
          this.mode = 'create';

          this.parentId =
            this.activatedRoute.snapshot.queryParams['parentId'] ?? undefined;
          this.parentDbName =
            this.activatedRoute.snapshot.queryParams['parentDbName'] ??
            undefined;

          request = of({});
        } else {
          this.mode = 'update';
          request = this.mixApi.databaseApi.getData(this.dbSysName, this.dbId);
        }

        forkJoin([
          this.mixApi.databaseApi.getDatabaseBySystemName(this.dbSysName),
          request,
        ])
          .pipe(this.observerLoadingStateSignal())
          .subscribe({
            next: ([db, data]) => {
              const { model, fields } = Utils.BuildDynamicFormField(
                db.columns,
                data,
                this.uploadFileFn,
                this.deleteFileFn
              );
              this.db = db;
              this.fields = fields;
              this.modelData = model;
              this.loadLinkableData();
            },
          });
      });
  }

  public saveData(): void {
    const db = this.db;
    if (!db) return;

    this.loadingState.set(LoadingState.Loading);
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
      .pipe(
        switchMap((result) => {
          if (
            this.mode === 'create' &&
            this.parentDbName &&
            this.parentId &&
            result.id !== undefined
          ) {
            this.mixApi.databaseApi
              .associateDb(
                this.dbSysName,
                result.id,
                this.parentDbName,
                this.parentId
              )
              .subscribe();
          }

          return of(result);
        })
      )
      .subscribe({
        next: (result) => {
          if (this.mode === 'create') {
            this.mode = 'update';
            this.modelData = result;
            this.loadLinkableData();
          }

          this.loadingState.set(LoadingState.Success);
        },
      });
  }

  public loadLinkableData(): void {
    if (!this.db) return;
    this.relationshipDbs = this.db?.relationships.filter(
      (r) => r.type === RelationShipType.OneToMany
    );
  }

  public goBack(): void {
    this.location.back();
  }

  public async createChild(relation: MixRelationShip) {
    if (!this.db) return;
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${relation.destinateDatabaseName}/create?parentId=${this.modelData.id}&parentDbName=${this.dbSysName}`
    );
  }

  async onEditData(data: MixDynamicData, sysName: string) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${sysName}/${data.id}`
    );
  }
}
