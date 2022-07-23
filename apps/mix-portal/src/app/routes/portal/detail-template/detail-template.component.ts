import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '@mix/mix.ui';
import { MixTemplateModel } from '@mix-spa/mix.lib';
import { BaseComponent, MixTemplateApiService } from '@mix-spa/mix.share';
import { TuiAlertService, TuiButtonModule } from '@taiga-ui/core';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { MonacoEditorModule } from 'ngx-monaco-editor';

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
    CodeEditorComponent
  ]
})
export class MixDetailTemplateComponent
  extends BaseComponent
  implements OnInit
{
  public activeTabIndex = 0;
  public settingForm: FormGroup = new FormGroup({
    autoSave: new FormControl(true)
  });

  public templateCode = '';
  public javascriptCode = '';
  public styleSheetCode = '';
  public currentTemplate!: MixTemplateModel;

  constructor(
    @Inject(TuiAlertService) public override alert: TuiAlertService,
    private templateApi: MixTemplateApiService,
    private activatedRoute: ActivatedRoute
  ) {
    super(alert);
  }

  public ngOnInit(): void {
    const templateId: string =
      this.activatedRoute.snapshot?.params['templateId'];
    this.templateApi.getTemplateById(templateId).subscribe(result => {
      this.currentTemplate = result;
      this.templateCode = result.content;
      this.styleSheetCode = result.styles;
      this.javascriptCode = result.scripts;
    });
  }

  public onSave(): void {
    const request: MixTemplateModel = {
      ...this.currentTemplate,
      content: this.templateCode,
      styles: this.styleSheetCode,
      scripts: this.javascriptCode
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
