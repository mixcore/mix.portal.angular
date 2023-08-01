import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixModule,
  MixPage,
  MixTemplate,
  MixTemplateFolder,
} from '@mixcore/lib/model';
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
  selector: 'mix-module-detail',
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
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent extends DetailPageKit implements OnInit {
  public availableTemplates: MixTemplate[] = [];
  public module!: MixModule;
  public moduleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl(''),
    content: new FormControl(''),
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
          this.mixApi.moduleApi
            .getDefault()
            .pipe(this.observerLoadingState())
            .subscribe((v: MixModule) => {
              this.module = v;
              this.moduleForm.patchValue(v);
            });
        } else {
          this.mode = 'update';
          this.mixApi.moduleApi
            .getById(this.id)
            .pipe(this.observerLoadingState())
            .subscribe((v: MixModule) => {
              this.module = v;
              this.moduleForm.patchValue(v);
              this.loadTemplate();
            });
        }
      });
  }

  loadTemplate(): void {
    if (!this.module?.template?.mixThemeId) return;

    this.mixApi.templateApi
      .gets({
        pageIndex: 0,
        pageSize: 1000,
        folderType: MixTemplateFolder.Pages,
        themeId: this.module.template.mixThemeId,
      })
      .subscribe((v) => {
        this.availableTemplates = v.items;
        this.moduleForm.controls.template.patchValue(
          v.items.find((v) => v.id === this.module.templateId)
        );
      });
  }

  submit(): void {
    if (FormHelper.validateForm(this.moduleForm)) {
      this.mixApi.moduleApi
        .save({
          ...this.module,
          ...(this.moduleForm.value as MixPage),
        })
        .pipe(this.observerLoadingState())
        .subscribe({
          next: (result) => {
            if (this.mode === 'create') {
              this.mode = 'update';

              this.module = result;
              this.moduleForm.patchValue(result);
              this.loadTemplate();
            }
          },
        });
    }
  }
}
