import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixContentStatus,
  MixDatabase,
  MixDynamicData,
  MixOrderBy,
  MixPost,
  MixRelationShip,
  MixTemplate,
  PaginationRequestModel,
  RelationShipType,
} from '@mixcore/lib/model';
import { BasicMixFilterComponent } from '@mixcore/share/components';
import { FormHelper } from '@mixcore/share/form';
import { Utils } from '@mixcore/share/utils';
import { MixArrayMediaComponent } from '@mixcore/ui/array-media';
import { MixButtonComponent } from '@mixcore/ui/button';
import { CodeEditorComponent } from '@mixcore/ui/code-editor';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { MixUploadComponent } from '@mixcore/ui/upload';
import { TranslocoModule } from '@ngneat/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  TuiPreviewDialogService,
  TuiPreviewModule,
} from '@taiga-ui/addon-preview';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDialogContext,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import {
  TuiFileLike,
  TuiInputInlineModule,
  TuiTabsModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { Observable, combineLatest, forkJoin, takeUntil } from 'rxjs';
import { DynamicDbListComponent } from '../../../../components/dynamic-db-list/dynamic-db-list.component';
import { MetadataAssociationComponent } from '../../../../components/metadata-association/metadata-association.component';
import { RelatedPostComponent } from '../../../../components/related-post/related-post.component';
import { MixStatusIndicatorComponent } from '../../../../components/status-indicator/mix-status-indicator.component';
import { TemplateEditorComponent } from '../../../../components/template-editor/template-editor.component';
import { FormlyMixModule } from '../../../../shares/kits/formly-mix.module';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';
import { PostStore } from '../../../../stores/post.store';

@Component({
  selector: 'mix-post-detail',
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
    CodeEditorComponent,
    TemplateEditorComponent,
    MixSelectComponent,
    TuiToggleModule,
    FormlyMixModule,
    MixUploadComponent,
    MixArrayMediaComponent,
    SkeletonLoadingComponent,
    DynamicDbListComponent,
    TranslocoModule,
    MetadataAssociationComponent,
    TuiPreviewModule,
    RelatedPostComponent,
    TuiLinkModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    MixStatusIndicatorComponent,
    BasicMixFilterComponent,
    TuiInputInlineModule,
    TuiAutoFocusModule,
  ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent extends DetailPageKit implements OnInit {
  public reviewSrv = inject(TuiPreviewDialogService);
  public postStore = inject(PostStore);

  @ViewChild('preview')
  readonly preview?: TemplateRef<TuiDialogContext>;

  public availableTemplates: MixTemplate[] = [];
  public post?: MixPost;
  public form = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl(''),
    content: new FormControl(''),
    seoKeywords: new FormControl(''),
    seoName: new FormControl(''),
    seoTitle: new FormControl(''),
    seoDescription: new FormControl(''),
    pageSize: new FormControl(),
    priority: new FormControl(0),
    cssClass: new FormControl(''),
    source: new FormControl(''),
    templateId: new FormControl(),
    template: new FormControl(),
    image: new FormControl(),
    status: new FormControl(),
  });

  public openChooseStatus = false;
  public statusOptions: MixContentStatus[] = [
    MixContentStatus.Published,
    MixContentStatus.Draft,
    MixContentStatus.Deleted,
    MixContentStatus.Preview,
  ];

  additionalDb: MixDatabase | undefined = undefined;
  forms = new FormGroup({});
  model: MixDynamicData = {};
  fields: FormlyFieldConfig[] = [];
  loadAdditionalDb = signal(false);
  postVariantDb: WritableSignal<MixRelationShip | undefined> =
    signal(undefined);
  metadataAllowedType = signal<string[]>([]);

  showMetadata = false;
  showVariant = false;
  showRelatedPost = false;
  editTitle = false;

  filterValue = signal<PaginationRequestModel>({
    status: MixContentStatus.Published,
    orderBy: MixOrderBy.CreatedDateTime,
    direction: 'Desc',
  });

  uploadFileFn = (file: TuiFileLike) => {
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('folder', 'MixContent/StaticFiles');

    return this.mixApi.uploadApi.uploadFile(formData);
  };

  deleteFileFn = (fileName: string) => {
    return this.mixApi.uploadApi.deleteFile(fileName);
  };

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];
        if (!this.id) return;

        this.activeTabIndex = 0;
        this.showMetadata = false;
        this.showVariant = false;
        this.showRelatedPost = false;

        this.mixApi.postApi
          .getById(this.id)
          .pipe(takeUntil(this.destroy$), this.observerLoadingState())
          .subscribe((v: MixPost) => {
            this.post = v;
            this.form.patchValue({ ...v, priority: v.priority || undefined });
            this.loadDbData();
          });
      });
  }

  loadDbData(): void {
    this.mixApi.databaseApi
      .getDatabaseBySystemName('Metadata')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (metadataDb) => {
          this.metadataAllowedType.set(
            metadataDb.columns?.find((c) => c.systemName === 'type')
              ?.columnConfigurations.allowedValues ?? []
          );
        },
      });

    if (!this.post?.mixDatabaseName) return;

    this.loadAdditionalDb.set(true);

    combineLatest([
      this.mixApi.databaseApi.getDatabaseBySystemName(
        this.post.mixDatabaseName
      ),
      this.mixApi.databaseApi.getDataByPostParent<
        Record<string, string | Date | number>
      >(this.post.mixDatabaseName, this.post.id),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([database, databaseData]) => {
          const { model, fields } = Utils.BuildDynamicFormField(
            database.columns,
            databaseData,
            this.uploadFileFn,
            this.deleteFileFn
          );

          this.model = model;
          this.fields = fields;
          this.additionalDb = database;
          this.postVariantDb.set(
            this.additionalDb.relationships?.find(
              (r) => r.type === RelationShipType.OneToMany
            )
          );
          this.loadAdditionalDb.set(false);
        },
        error: () => this.loadAdditionalDb.set(false),
      });
  }

  submit(): void {
    if (FormHelper.validateForm(this.form)) {
      const requests: (Observable<MixPost> | Observable<MixDynamicData>)[] = [
        this.mixApi.postApi.save({
          ...this.post,
          ...(this.form.value as MixPost),
        }),
      ];

      if (this.additionalDb?.systemName) {
        requests.push(
          this.mixApi.databaseApi.saveData(
            this.additionalDb.systemName,
            this.model['id'] as number,
            { ...this.model, ...this.forms.getRawValue() },
            this.additionalDb.displayName
          )
        );
      }

      forkJoin(requests)
        .pipe(this.observerLoadingState())
        .subscribe(() => {
          this.postStore.reload();
        });
    }
  }

  showPreviewThumb(): void {
    this.reviewSrv.open(this.preview || '').subscribe({});
  }

  clearCache(): void {
    if (!this.post?.id) return;

    this.mixApi.postApi.removeCache(this.post?.id).subscribe();
  }

  changeStatus(status: MixContentStatus) {
    this.form.controls.status.patchValue(status);
    setTimeout(() => {
      this.openChooseStatus = false;
    });
  }

  public toggleEditTitle() {
    this.editTitle = !this.editTitle;
  }

  public onFocusedChange(focused: boolean): void {
    if (!focused) this.editTitle = false;
  }
}
