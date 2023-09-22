import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixDateTimePickerComponent } from './date-time-picker.component';

@Component({
  selector: 'mix-formly-date-time-picker',
  template: `
    <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
      <mix-date-time-picker
      [formControl]="formControl"
      [formlyAttributes]="field"
      />
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixDateTimePickerComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyDateTimePickerComponent extends FieldType<FieldTypeConfig> {}
