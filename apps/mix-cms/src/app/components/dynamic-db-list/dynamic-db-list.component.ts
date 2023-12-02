import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MixColumn,
  MixDatabase,
  MixDynamicData,
  PaginationModel,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent, LoadingState } from '@mixcore/share/base';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { forkJoin, take } from 'rxjs';
import { FormlyMixModule } from '../../shares/kits/formly-mix.module';

import { CompressImageComponent } from '@mixcore/share/components';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { EditModeDirective, EditableComponent } from '@ngneat/edit-in-place';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiDataListModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { DynamicDataDisplayComponent } from '../dynamic-data-display/dynamic-data-display.component';

@Component({
  selector: 'mix-dynamic-db-list',
  standalone: true,
  imports: [
    CommonModule,
    MixDataTableModule,
    MixButtonComponent,
    RelativeTimeSpanPipe,
    FormlyMixModule,
    ReactiveFormsModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    SkeletonLoadingComponent,
    CompressImageComponent,
    DynamicDataDisplayComponent,
    EditableComponent,
    EditModeDirective,
    EditModeDirective,
    MixInputComponent,
    MixInputNumberComponent,
    TuiHostedDropdownModule,
    TuiDataListModule,
  ],
  templateUrl: './dynamic-db-list.component.html',
  styleUrls: ['./dynamic-db-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDbListComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input({ required: true }) dbSysName!: string;
  @Input() type: 'inline' | 'output' = 'inline';
  @Input() editContainerClass = '';
  @Input() parentId: number | undefined = undefined;
  @Input() guidParentId: string | undefined = undefined;
  @Input() parentName: string | undefined = undefined;
  @Input() showUnlink = false;
  @Input() viewOnly = false;

  @Input()
  filterValue: PaginationRequestModel = {};

  @Input() onloadSuccess = (db: MixDatabase) => {
    db;
  };

  @Output() savedSuccess: EventEmitter<void> = new EventEmitter();
  @Output() editDataChange: EventEmitter<MixDynamicData> = new EventEmitter();
  @Output() public itemsSelectedChange: EventEmitter<MixDynamicData[]> =
    new EventEmitter();

  // Injection
  public mixApi = inject(MixApiFacadeService);
  public router = inject(Router);
  public modal = inject(ModalService);
  public toast = inject(HotToastService);
  public showSidebar = signal(false);
  public cdr = inject(ChangeDetectorRef);

  // Query
  public query = signal(<PaginationRequestModel>{
    direction: 'Desc',
    pageIndex: 0,
    pageSize: 30,
  });
  public pageInfo = signal(<PaginationModel>{
    pageIndex: 0,
    pageSize: 30,
  });

  public data = signal(<MixDynamicData[]>[]);
  public columns = signal(<MixColumn[]>[]);
  public db = signal(<MixDatabase | undefined>undefined);
  public searchFieldOptions: string[] = [];
  public searchFieldOptionsDict: { [key: string]: string } = {};
  public selectedData = signal<MixDynamicData | undefined>(undefined);

  // Edit variant require item
  public model: MixDynamicData = {};
  public fields: FormlyFieldConfig[] = [];
  public forms: FormGroup | undefined = undefined;
  public savingVariant = signal(false);
  public contextMenus: TableContextMenu<MixDynamicData>[] = [
    {
      label: 'Edit',
      action: (item: MixDynamicData) => {
        this.editData(item);
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixDynamicData) => {
        this.deleteDbData(item);
      },
      icon: 'delete',
    },
  ];

  public get canReOrder(): boolean {
    return this.query().orderBy === 'priority';
  }

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

    effect(
      () => {
        this.loadData(this.query());
      },
      { allowSignalWrites: true }
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    const filter = changes['filterValue'];

    if (filter) {
      this.query.update((s) =>
        Utils.clean({
          ...s,
          ...filter.currentValue,
        })
      );
    }
  }

  public ngOnInit() {
    this.loadData(this.query());
  }

  public loadData(request: PaginationRequestModel, silentLoad = false) {
    if (!this.dbSysName) return;

    const query = request;
    if (this.parentId !== undefined) {
      query.parentId = this.parentId;
    }

    if (this.guidParentId !== undefined) {
      query.guidParentId = this.guidParentId;
    }

    if (this.parentName !== undefined) {
      query.parentName = this.parentName;
    }

    forkJoin([
      this.mixApi.databaseApi.getDataByName<MixDynamicData>(
        this.dbSysName,
        query
      ),
      this.mixApi.databaseApi.getDatabaseBySystemName(this.dbSysName),
    ])
      .pipe(this.observerLoadingStateSignal(silentLoad))
      .subscribe({
        next: ([result, db]) => {
          const columnsToShow = [...db.columns]
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 4);

          this.searchFieldOptions = [];
          columnsToShow.forEach((x) => {
            this.searchFieldOptions.push(x.displayName);
            this.searchFieldOptionsDict[x.displayName] = x.systemName;
          });

          this.data.set(result.items);
          this.pageInfo.set(result.pagingData);
          this.db.set(db);

          this.columns.set(columnsToShow);
          this.onloadSuccess(db);
        },
      });
  }

  public onSearchChange(searchText: string, searchField: string[]) {
    const searchFields = searchField
      .map((field) => this.searchFieldOptionsDict[field])
      .join(', ');

    this.query.update((s) => ({
      ...s,
      keyword: searchText,
      searchColumns: searchFields,
      searchMethod: 'InRange',
    }));
  }

  public editData(data: MixDynamicData) {
    const db = this.db();
    if (!db) return;

    if (this.type === 'output') {
      this.editDataChange.emit(data);
      return;
    }

    this.showSidebar.set(true);

    setTimeout(() => {
      this.forms = new FormGroup({});
      this.selectedData.set(data);
      const { model, fields } = Utils.BuildDynamicFormField(
        db.columns,
        data,
        this.uploadFileFn,
        this.deleteFileFn
      );

      this.model = model;
      this.fields = fields;
      this.cdr.detectChanges();
    }, 50);
  }

  public onBack(silentLoad = false): void {
    this.onReload(silentLoad);
    this.selectedData.set(undefined);
    this.showSidebar.set(false);

    this.forms = undefined;
    this.fields = [];
    this.model = {};
  }

  public onReload(silentLoad = false): void {
    this.loadData(this.query(), silentLoad);
  }

  public saveData(): void {
    const db = this.db();
    if (!db) return;
    if (!this.model.id) return;
    if (!this.forms) return;

    this.savingVariant.set(true);
    this.mixApi.databaseApi
      .saveData(db.systemName, this.model.id, {
        ...this.model,
        ...this.forms.getRawValue(),
      })
      .pipe(
        this.toast.observe({
          loading: 'Processing',
          success: `Successfully save your ${db.displayName}`,
          error: 'Something error, please try gain',
        })
      )
      .subscribe({
        next: (result) => {
          const currentData = this.data();
          const index = currentData.findIndex((d) => d.id === result?.id);
          if (index !== undefined) {
            currentData[index] = result;
            this.data.set(currentData);
          }

          this.savedSuccess.emit();
          this.onBack();
        },
        complete: () => {
          this.savingVariant.set(false);
        },
        error: () => {
          this.savingVariant.set(false);
        },
      });
  }

  public onPageChange(index: number): void {
    this.query.update((s) => ({ ...s, pageIndex: index }));
  }

  public deleteDbData(data: MixDynamicData): void {
    this.modal
      .warning('Are you sure to delete this data?')
      .pipe(take(1))
      .subscribe((ok) => {
        if (ok && data.id) {
          this.mixApi.databaseApi
            .deleteData(this.dbSysName, data.id)
            .subscribe({
              next: () => {
                this.toast.success('successfully delete data');
                this.loadData(this.query());
              },
              error: () => {
                this.toast.error('Something wrong when try to delete data!');
              },
            });
        }
      });
  }

  public unLinkDbData(data: MixDynamicData): void {
    if (!this.showUnlink || this.parentId === undefined || !this.parentName)
      return;

    this.modal
      .warning('Are you sure to unlink this data?')
      .pipe(take(1))
      .subscribe((ok) => {
        if (ok && data.id && this.parentName && this.parentId !== undefined) {
          this.mixApi.databaseApi
            .deleteAssociateDb(
              this.dbSysName,
              data.id,
              this.parentName,
              this.parentId
            )
            .subscribe({
              next: () => {
                this.toast.success('successfully unlink database');
                this.loadData(this.query());
              },
              error: () => {
                this.toast.error('Something wrong when try to unlink data!');
              },
            });
        }
      });
  }

  public onDragDropDataChange(data: {
    item: MixDynamicData;
    toItem: MixDynamicData;
  }) {
    this.loadingState.set(LoadingState.Loading);
    this.mixApi.databaseApi
      .updateDbDataPriority(this.dbSysName, data.item.id!, 1)
      .subscribe(() => {
        this.onReload();
      });
  }

  public onSave(value: string, fieldName: string, item: MixDynamicData) {
    const patchRequest = { id: item.id };
    (patchRequest as any)[fieldName] = value;

    this.mixApi.databaseApi
      .patchData(this.dbSysName, item.id!, patchRequest)
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Successfully apply your changes',
          error: 'Something error, please try gain',
        })
      )
      .subscribe(() => this.onReload());
  }
}
