import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  MixPostPortalModel,
  MixPostReferenceModel,
  MixTemplateModel
} from '@mix-spa/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  FormUtils,
  MixPostApiService,
  MixTemplateApiService,
  PostNavSelectedComponent
} from '@mix-spa/mix.share';
import {
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { delay } from 'rxjs';

@Component({
  selector: 'mix-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    TuiDataListWrapperModule
  ]
})
export class PostDetailComponent extends BaseComponent implements OnInit {
  public selectedPostNavs: MixPostReferenceModel[] = [];
  public activeTabIndex = 0;
  public post!: MixPostPortalModel;
  public form!: FormGroup;
  public availableTemplates: MixTemplateModel[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private postApi: MixPostApiService,
    private templateApi: MixTemplateApiService,
    private fb: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.postApi
      .getPostById(this.activatedRoute.snapshot.params['id'])
      .pipe(delay(1000))
      .subscribe({
        next: result => {
          this.post = result;
          this.selectedPostNavs = result.postNavs ?? [];
          this.form = this.fb.group({
            title: [result.title, [Validators.required]],
            excerpt: [result.excerpt, [Validators.required]],
            content: [result.content, [Validators.required]],
            seoTitle: [result.seoTitle],
            seoName: [result.seoName],
            seoDescription: [result.seoDescription],
            seoKeywords: [result.seoKeywords],
            seoSource: [result.seoSource]
          });

          this.loadTemplate();
          this.loading$.next(false);
        },
        error: () => {
          this.error$.next(true);
        }
      });
  }

  public loadTemplate(): void {
    if (!this.post || !this.post.template) return;
    this.templateApi
      .getTemplates({
        themeId: this.post.template?.mixThemeId,
        folderType: this.post.template.folderType,
        pageSize: 1000
      })
      .subscribe({
        next: result => {
          this.availableTemplates = result.items;
        }
      });
  }

  public savePost(): void {
    if (!this.form || !this.post) return;
    if (!FormUtils.validateForm(this.form)) return;

    const post: MixPostPortalModel = {
      ...this.post,
      ...this.form.getRawValue()
    };

    this.postApi.savePost(post).subscribe({
      next: () => {
        this.showSuccess('Successfully save your post');
      },
      error: () => {
        this.showError('Error, please try again');
      }
    });
  }
}
