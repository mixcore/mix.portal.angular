import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CodeEditorComponent,
  InputLabeledComponent,
  RichTextEditorComponent,
  SkeletonLoadingComponent
} from '@mix/mix.ui';
import {
  MixPagePortalModel,
  MixPostReferenceModel,
  MixTemplateModel
} from '@mix-spa/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DestroyService,
  FormUtils,
  MixPageApiService,
  MixTemplateApiService,
  PostNavSelectedComponent,
  TemplateEditorComponent
} from '@mix-spa/mix.share';
import { TuiSvgModule } from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingComponent,
    ContentDetailContainerComponent,
    TuiTabsModule,
    ReactiveFormsModule,
    InputLabeledComponent,
    RichTextEditorComponent,
    PostNavSelectedComponent,
    CodeEditorComponent,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TemplateEditorComponent
  ],
  providers: [DestroyService]
})
export class PageDetailComponent extends BaseComponent implements OnInit {
  public selectedPostNavs: MixPostReferenceModel[] = [];
  public activeTabIndex = 0;
  public page!: MixPagePortalModel;
  public form!: FormGroup;
  public availableTemplates: MixTemplateModel[] = [];
  public selectedTemplate: MixTemplateModel | undefined = undefined;
  public selectedTemplateId: number | undefined = undefined;

  constructor(
    public activatedRoute: ActivatedRoute,
    private pageApi: MixPageApiService,
    private templateApi: MixTemplateApiService,
    private fb: FormBuilder,
    private destroy: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.pageApi
      .getPageById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: result => {
          this.page = result;
          this.form = this.fb.group({
            title: [result.title, [Validators.required]],
            excerpt: [result.excerpt],
            content: [result.content],
            seoTitle: [result.seoTitle],
            seoName: [result.seoName],
            seoDescription: [result.seoDescription],
            seoKeywords: [result.seoKeywords],
            seoSource: [result.seoSource]
          });

          this.selectedTemplateId = this.page.templateId;
          this.registerTitleChange();
          this.loadTemplate();
          this.loading$.next(false);
        },
        error: () => {
          this.error$.next(true);
        }
      });
  }

  public loadTemplate(): void {
    if (!this.page || !this.page.templateId) return;

    // this.templateApi
    //   .getTemplates({
    //     themeId: this.page.template?.mixThemeId,
    //     folderType: this.page.template.folderType,
    //     columns: 'id, fileName',
    //     pageSize: 1000
    //   })
    //   .subscribe({
    //     next: result => {
    //       this.availableTemplates = result.items;
    //       this.selectedTemplate = result.items.find(
    //         i => i.id == this.page.templateId
    //       );
    //     }
    //   });
  }

  public registerTitleChange(): void {
    this.header.setTitle(this.form.value.title);
    this.form.controls['title'].valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(t => this.header.setTitle(t));
    this.destroy.subscribe(() => this.header.hideTitle());
  }

  public savePage(): void {
    if (!this.form || !this.page) return;
    if (!FormUtils.validateForm(this.form)) return;

    const page: MixPagePortalModel = {
      ...this.page,
      ...this.form.getRawValue()
    };

    this.pageApi.savePage(page).subscribe({
      next: () => {
        this.showSuccess('Successfully save your page');
      },
      error: () => {
        this.showError('Error, please try again');
      }
    });
  }
}
