import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject, debounceTime } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MixTemplate } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper } from '@mixcore/share/form';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { CodeEditorComponent } from '@mixcore/ui/code-editor';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CodeEditorComponent,
    MixButtonComponent,
    TuiTabsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class TemplateEditorComponent extends BaseComponent {
  @Input() public disabled = false;
  @Input() public set templateId(value: number) {
    this._templateId = value;
    this.loadTemplate();
  }
  public get templateId() {
    return this._templateId;
  }

  public isValueChanges$ = new BehaviorSubject<boolean>(false);
  public minimize = false;
  public activeTabIndex = 0;
  public currentTemplate: MixTemplate | null = null;
  public form: FormGroup = new FormGroup({
    templateCode: new FormControl('hello world'),
    javascriptCode: new FormControl(''),
    styleSheetCode: new FormControl(''),
  });
  public initialValue: {
    templateCode: string;
    javascriptCode: string;
    styleSheetCode: string;
  } = this.form.getRawValue();

  private _templateId = 0;
  constructor(
    private cdr: ChangeDetectorRef,
    public facadeApi: MixApiFacadeService
  ) {
    super();
  }

  public loadTemplate(): void {
    if (!this.templateId) return;

    this.facadeApi.templateApi.getById(this.templateId).subscribe((result) => {
      this.currentTemplate = result;
      this.form.controls['templateCode'].patchValue(result.content);
      this.form.controls['styleSheetCode'].patchValue(result.styles);
      this.form.controls['javascriptCode'].patchValue(result.scripts);
      this.initialValue = this.form.getRawValue();

      this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        this.isValueChanges$.next(Utils.isDifferent(this.initialValue, value));
      });
    });

    // this.templateApi.getById(this._templateId).subscribe((result) => {
    //   this.currentTemplate = result;

    //   this.initialValue = this.form.getRawValue();

    //   this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
    //     this.isValueChanges$.next(Utils.isDifferent(this.initialValue, value));
    //   });
    //   this.cdr.detectChanges();
    // });
  }

  public onSave(): void {
    if (!this.currentTemplate) return;
    if (!FormHelper.validateForm(this.form)) return;

    const request = {
      ...this.currentTemplate,
      content: this.form.controls['templateCode'].value,
      styles: this.form.controls['styleSheetCode'].value,
      scripts: this.form.controls['javascriptCode'].value,
    };

    // this.templateApi
    //   .save(request)
    //   .pipe(this.observerLoadingState())
    //   .subscribe({
    //     next: () => {
    //       this.initialValue = this.form.getRawValue();
    //       this.isValueChanges$.next(false);
    //     },
    //   });
  }

  public onDiscardChange(): void {
    this.form.patchValue(this.initialValue);
    this.isValueChanges$.next(false);
  }
}
