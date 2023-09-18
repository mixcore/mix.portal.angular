import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixArrayMediaComponent } from './array-media.component';

@Component({
  selector: 'mix-array-media-formly',
  template: `
  <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
    <mix-array-media
      [formControl]="formControl"
      [requestFn]="field.props['uploadFn']"
      [deleteFn]="field.props['deleteFileFn']"
      [formlyAttributes]="field"
    />
  </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixArrayMediaComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyArrayMediaComponent extends FieldType<FieldTypeConfig> {}
