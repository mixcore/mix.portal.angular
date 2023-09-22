import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixDatePickerComponent } from './date-picker.component';

@Component({
  selector: 'mix-formly-input',
  template: `
  <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
    <mix-date-picker
          [formControl]="formControl"
          [formlyAttributes]="field"
    />
  </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixDatePickerComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyDatePickerComponent extends FieldType<FieldTypeConfig> {}
