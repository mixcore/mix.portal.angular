import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '@mix/mix.ui';
import { MixTemplateModel } from '@mix-spa/mix.lib';
import { MixTemplateApiService } from '@mix-spa/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';
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
export class MixDetailTemplateComponent {
  public activeTabIndex = 0;
  public settingForm: FormGroup = new FormGroup({
    autoSave: new FormControl(true)
  });

  public templateCode = '';
  public javascriptCode = '';
  public styleSheetCode = '';
  public currentTemplate!: MixTemplateModel;

  constructor(
    private templateApi: MixTemplateApiService,
    private activatedRoute: ActivatedRoute
  ) {
    const templateId: string =
      this.activatedRoute.snapshot?.params['templateId'];
    this.templateApi.getTemplateById(templateId).subscribe(r => {
      this.currentTemplate = r;
      this.templateCode = r.content;
      this.styleSheetCode = r.styles;
      this.javascriptCode = r.scripts;
    });
  }

  public onTabChange(tabIndex: number): void {
    //
  }
}
