import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixEditorComponent } from './rich-text-editor.component';

@Component({
  selector: 'mix-formly-toggle',
  template: `
    <div class="row mb-4">
      <div class="col-md-2">
        <span class="content-label mb-1"> {{ field.props.label }}:</span>
        <div class="content-sub-label">{{ field.type }}</div>
      </div>

      <div class="col-md-10">
        <mix-rich-text-editor
          style="height: 300px"
          [formControl]="formControl"
          [formlyAttributes]="field"
        ></mix-rich-text-editor>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixEditorComponent,
    CommonModule,
  ],
})
export class MixFormlyRichTextComponent extends FieldType<FieldTypeConfig> {}
