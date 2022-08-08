import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CodeEditorComponent,
  InlineEditPlaceholderComponent
} from '@mix/mix.ui';
import { MixTemplateModel } from '@mix-spa/mix.lib';
import {
  BaseComponent,
  FormUtils,
  MixTemplateApiService,
  TemplateEditorComponent
} from '@mix-spa/mix.share';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-detail-template',
  templateUrl: './detail-template.component.html',
  styleUrls: ['./detail-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiToggleModule,
    TuiTabsModule,
    CodeEditorComponent,
    InlineEditPlaceholderComponent,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TemplateEditorComponent
  ]
})
export class MixDetailTemplateComponent
  extends BaseComponent
  implements OnInit
{
  public activeTabIndex = 0;
  public autoSave: FormControl = new FormControl(true);
  public form: FormGroup = new FormGroup({
    templateTitle: new FormControl('', Validators.required),
    templateCode: new FormControl(''),
    javascriptCode: new FormControl(''),
    styleSheetCode: new FormControl('')
  });

  public currentTemplate!: MixTemplateModel;

  constructor(
    private templateApi: MixTemplateApiService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    const templateId = this.activatedRoute.snapshot?.params['templateId'];
    this.templateApi.getTemplateById(templateId).subscribe(result => {
      this.currentTemplate = result;
      this.form.controls['templateCode'].patchValue(result.content);
      this.form.controls['styleSheetCode'].patchValue(result.styles);
      this.form.controls['javascriptCode'].patchValue(result.scripts);
      this.form.controls['templateTitle'].patchValue(result.fileName);

      this.form.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
        if (this.autoSave.value) this.onSave();
      });
    });
  }

  public onSave(): void {
    if (!FormUtils.validateForm(this.form)) return;

    const request: MixTemplateModel = {
      ...this.currentTemplate,
      content: this.form.controls['templateCode'].value,
      styles: this.form.controls['styleSheetCode'].value,
      scripts: this.form.controls['javascriptCode'].value,
      fileName: this.form.value.templateTitle
    };

    this.templateApi.saveTemplate(request).subscribe({
      next: () => {
        this.showSuccess('Successfully save');
      },
      error: () => {
        this.showError('Error when save template, please try again');
      }
    });
  }
}
