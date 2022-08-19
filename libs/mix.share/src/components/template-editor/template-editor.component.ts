import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CodeEditorComponent } from '@mix/mix.ui';
import { MixTemplateModel } from '@mix-spa/mix.lib';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { BaseComponent } from '../../bases/base-component.component';
import { MixTemplateApiService } from '../../services/api/mix-template-api.service';
import { ShareModule } from '../../share.module';
import { FormUtils, Utils } from '../../utils';

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

  public isValueChanges$ = new BehaviorSubject<boolean>(false);
  public minimize = false;
  public activeTabIndex = 0;
  public currentTemplate: MixTemplateModel | null = null;
  public form: FormGroup = new FormGroup({
    templateCode: new FormControl(''),
    javascriptCode: new FormControl(''),
    styleSheetCode: new FormControl('')
  });
  public initialValue: {
    templateCode: string;
    javascriptCode: string;
    styleSheetCode: string;
  } = this.form.getRawValue();

  private _templateId = 0;
  constructor(
    private templateApi: MixTemplateApiService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public loadTemplate(): void {
    this.templateApi.getById(this._templateId).subscribe(result => {
      this.currentTemplate = result;
      this.form.controls['templateCode'].patchValue(result.content);
      this.form.controls['styleSheetCode'].patchValue(result.styles);
      this.form.controls['javascriptCode'].patchValue(result.scripts);
      this.initialValue = this.form.getRawValue();

      this.form.valueChanges.pipe(debounceTime(500)).subscribe(value => {
        this.isValueChanges$.next(Utils.isDifferent(this.initialValue, value));
      });
      this.cdr.detectChanges();
    });
  }

  public onSave(): void {
    if (!this.currentTemplate) return;
    if (!FormUtils.validateForm(this.form)) return;

    const request: MixTemplateModel = {
      ...this.currentTemplate,
      content: this.form.controls['templateCode'].value,
      styles: this.form.controls['styleSheetCode'].value,
      scripts: this.form.controls['javascriptCode'].value
    };

    this.templateApi.save(request).subscribe({
      next: () => {
        this.showSuccess('Successfully save');
        this.initialValue = this.form.getRawValue();
        this.isValueChanges$.next(false);
      },
      error: () => {
        this.showError('Error when save template, please try again');
      }
    });
  }

  public onDiscardChange(): void {
    this.form.patchValue(this.initialValue);
    this.isValueChanges$.next(false);
  }
}
