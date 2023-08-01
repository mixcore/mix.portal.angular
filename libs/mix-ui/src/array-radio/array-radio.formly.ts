import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixArrayRadioComponent } from './array-radio.component';

@Component({
  selector: 'mix-array-radio-formly',
  template: `
  <div class="row mb-4">
    <div class="col-md-2">
      <span class="content-label mb-1"> {{ field.props.label }}:</span>
      <div class="content-sub-label">{{ field.type }}</div>
    </div>

      <div class="col-md-10">
        <mix-array-radio
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
    MixArrayRadioComponent,
    CommonModule,
  ],
})
export class MixFormlyArrayRadioComponent extends FieldType<FieldTypeConfig> {}
