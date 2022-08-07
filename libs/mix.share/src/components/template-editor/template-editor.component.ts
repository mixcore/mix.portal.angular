import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CodeEditorComponent } from '@mix/mix.ui';
import { MixTemplateModel } from '@mix-spa/mix.lib';

import { BaseComponent } from '../../bases/base-component.component';
import { MixTemplateApiService } from '../../services/api/mix-template-api.service';
import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, CodeEditorComponent],
  providers: []
})
export class TemplateEditorComponent extends BaseComponent {
  @Input() public disabled = false;
  @Input() public set templateId(value: number) {
    this._templateId = value;
    this.loadTemplate();
  }

  public activeTabIndex = 0;
  public currentTemplate: MixTemplateModel | null = null;
  public form: FormGroup = new FormGroup({
    templateCode: new FormControl(''),
    javascriptCode: new FormControl(''),
    styleSheetCode: new FormControl('')
  });

  private _templateId = 0;
  constructor(
    private templateApi: MixTemplateApiService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public loadTemplate(): void {
    this.templateApi.getTemplateById(this._templateId).subscribe(result => {
      this.currentTemplate = result;
      this.form.controls['templateCode'].patchValue(result.content);
      this.form.controls['styleSheetCode'].patchValue(result.styles);
      this.form.controls['javascriptCode'].patchValue(result.scripts);
      this.cdr.detectChanges();
    });
  }
}
