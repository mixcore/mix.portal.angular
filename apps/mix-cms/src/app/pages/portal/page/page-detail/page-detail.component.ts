import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MixPage, MixTemplate, MixTemplateFolder } from '@mixcore/lib/model';
import { FormHelper } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { CodeEditorComponent } from '@mixcore/ui/code-editor';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { TemplateEditorComponent } from '../../../../components/template-editor/template-editor.component';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';

@Component({
  selector: 'mix-page-detail',
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
  ],
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
})
export class PageDetailComponent extends DetailPageKit implements OnInit {
  public availableTemplates: MixTemplate[] = [];
  public page!: MixPage;
  public pageForm = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl(''),
    content: new FormControl(''),
    seoKeywords: new FormControl(''),
    seoName: new FormControl(''),
    seoTitle: new FormControl(''),
    seoDescription: new FormControl(''),
    pageSize: new FormControl(),
    priority: new FormControl(12),
    cssClass: new FormControl(''),
    source: new FormControl(''),
    templateId: new FormControl(),
    template: new FormControl(),
  });

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];

        if (!this.id) return;
        if (this.id === 'create') {
          this.mode = 'create';
          this.mixApi.pageApi
            .getDefault()
            .pipe(this.observerLoadingState())
            .subscribe((v: MixPage) => {
              this.page = v;
              this.pageForm.patchValue(v);
            });
        } else {
          this.mode = 'update';
          this.mixApi.pageApi
            .getById(this.id)
            .pipe(this.observerLoadingState())
            .subscribe((v: MixPage) => {
              this.page = v;
              this.pageForm.patchValue(v);
              this.loadTemplate();
            });
        }
      });
  }

  loadTemplate(): void {
    if (!this.page?.template?.mixThemeId) return;

    this.mixApi.templateApi
      .gets({
        pageIndex: 0,
        pageSize: 1000,
        folderType: MixTemplateFolder.Pages,
        themeId: this.page.template.mixThemeId,
      })
      .subscribe((v) => {
        this.availableTemplates = v.items;
        this.pageForm.controls.template.patchValue(
          v.items.find((v) => v.id === this.page.templateId)
        );
      });
  }

  submit(): void {
    if (FormHelper.validateForm(this.pageForm)) {
      this.mixApi.pageApi
        .save({
          ...this.page,
          ...(this.pageForm.value as MixPage),
        })
        .pipe(this.observerLoadingState())
        .subscribe({
          next: (result) => {
            if (this.mode === 'create') {
              this.mode = 'update';

              this.page = result;
              this.pageForm.patchValue(result);
              this.loadTemplate();
            }
          },
        });
    }
  }
}
