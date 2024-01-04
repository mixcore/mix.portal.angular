import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixInputComponent } from './input.component';
@Component({
  selector: 'mix-formly-input',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-input
        [type]="field.props.type ?? 'text'"
        [placeHolder]="'Input ' + field.props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixInputComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyInputComponent extends FieldType<FieldTypeConfig> {
  @ViewChild(MixInputComponent) input!: MixInputComponent;

  ngAfterViewInit() {
    if (this.field.id?.endsWith('0')) {
      this.input.focus();
    }
  }
}
