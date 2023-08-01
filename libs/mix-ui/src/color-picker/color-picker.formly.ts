import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixColorPickerComponent } from './color-picker.component';

@Component({
  selector: 'mix-formly-color-picker',
  template: `
    <div class="row mb-4">
      <div class="col-md-2">
          <span class="content-label mb-1"> {{ field.props.label }}:</span>
          <div class="content-sub-label">{{ field.type }}</div>
      </div>

      <div class="col-md-10">
          <mix-color-picker
          [placeHolder]="'Choose ' + field.props.label + ' color'"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixColorPickerComponent,
    CommonModule,
  ],
})
export class MixFormlyColorPickerComponent extends FieldType<FieldTypeConfig> {}
