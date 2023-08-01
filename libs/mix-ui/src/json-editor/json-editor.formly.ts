import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixJsonEditorComponent } from './json-editor.component';

@Component({
  selector: 'mix-json-editor-formly',
  standalone: true,
  template: `
          <div class="row mb-4">
          <div class="col-md-2">
              <span class="content-label mb-1"> {{ field.props.label }}:</span>
              <div class="content-sub-label">{{ field.type }}</div>
          </div>

          <div class="col-md-10">
              <mix-json-editor
              [formControl]="formControl"
              [formlyAttributes]="field"
            />
          </div>
        </div>
  `,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    CommonModule,
    MixJsonEditorComponent,
  ],
})
export class JsonEditorFormlyComponent extends FieldType<FieldTypeConfig> {}
