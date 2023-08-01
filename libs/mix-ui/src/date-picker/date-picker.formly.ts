import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixDatePickerComponent } from './date-picker.component';

@Component({
  selector: 'mix-formly-input',
  template: `
  <div class="row mb-4">
    <div class="col-md-2">
      <span class="content-label mb-1"> {{ field.props.label }}:</span>
      <div class="content-sub-label">{{ field.type }}</div>
    </div>

      <div class="col-md-10">
        <mix-date-picker
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
    MixDatePickerComponent,
    CommonModule,
  ],
})
export class MixFormlyDatePickerComponent extends FieldType<FieldTypeConfig> {}
