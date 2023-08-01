import { CommonModule } from '@angular/common';
import { Component, Inject, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';
import { BaseTextControl } from '../base/base-text.control';

@Component({
  selector: 'mix-json-editor',
  standalone: true,
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    CommonModule,
    NgJsonEditorModule,
  ],
})
export class MixJsonEditorComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  public editorOptions: JsonEditorOptions = new JsonEditorOptions();

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    public override readonly ngControl: NgControl | null
  ) {
    super(ngControl);
    this.editorOptions.modes = [];
    this.editorOptions.mode = 'tree';
    this.editorOptions.enableTransform = false;
    this.editorOptions.enableSort = false;
  }
}
