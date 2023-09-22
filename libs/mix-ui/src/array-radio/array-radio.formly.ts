import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixArrayRadioComponent } from './array-radio.component';

@Component({
  selector: 'mix-array-radio-formly',
  template: `
  <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
    <mix-array-radio
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixArrayRadioComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyArrayRadioComponent extends FieldType<FieldTypeConfig> {}
