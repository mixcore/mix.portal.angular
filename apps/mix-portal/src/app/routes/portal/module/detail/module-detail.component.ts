import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  MixModulePortalModel,
  MixPostReferenceModel,
  MixTemplateModel
} from '@mix-spa/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DestroyService,
  FormUtils,
  MixModuleApiService,
  MixTemplateApiService,
  PostNavSelectedComponent,
  TemplateEditorComponent
} from '@mix-spa/mix.share';
import {
  TuiLabelModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
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
    TemplateEditorComponent,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiLabelModule
  ],
  providers: [DestroyService]
})
export class ModuleDetailComponent extends BaseComponent implements OnInit {
  public selectedPostNavs: MixPostReferenceModel[] = [];
  public activeTabIndex = 0;
  public module!: MixModulePortalModel;
  public form!: FormGroup;
  public availableTemplates: MixTemplateModel[] = [];
  public selectedTemplate: MixTemplateModel | undefined = undefined;

  constructor(
    public activatedRoute: ActivatedRoute,
    private moduleApi: MixModuleApiService,
    private templateApi: MixTemplateApiService,
    private fb: FormBuilder,
    private destroy: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.moduleApi
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: result => {
          this.module = result;
          this.form = this.fb.group({
            title: [result.title, [Validators.required]],
            excerpt: [result.excerpt],
            content: [result.content]
          });

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
    if (!this.module || !this.module.template) return;

    this.templateApi
      .gets({
        themeId: this.module.template?.mixThemeId,
        folderType: this.module.template.folderType,
        columns: 'id, fileName',
        pageSize: 1000
      })
      .subscribe({
        next: result => {
          this.availableTemplates = result.items;
          this.selectedTemplate = result.items.find(
            i => i.id == this.module.templateId
          );
        }
      });
  }

  public registerTitleChange(): void {
    this.header.setTitle(this.form.value.title);
    this.form.controls['title'].valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(t => this.header.setTitle(t));
    this.destroy.subscribe(() => this.header.hideTitle());
  }

  public savePage(): void {
    if (!this.form || !this.module) return;
    if (!FormUtils.validateForm(this.form)) return;

    const module: MixModulePortalModel = {
      ...this.module,
      ...this.form.getRawValue()
    };

    this.moduleApi.save(module).subscribe({
      next: () => {
        this.showSuccess('Successfully save your module');
      },
      error: () => {
        this.showError('Error, please try again');
      }
    });
  }

  public moduleTemplateChange(template: MixTemplateModel): void {
    this.module.templateId = template.id;
  }
}
