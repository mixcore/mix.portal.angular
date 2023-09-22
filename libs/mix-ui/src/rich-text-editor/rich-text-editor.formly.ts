import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixEditorComponent } from './rich-text-editor.component';

@Component({
  selector: 'mix-formly-toggle',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-rich-text-editor
        style="height: 300px"
        [formControl]="formControl"
        [formlyAttributes]="field"
      ></mix-rich-text-editor>
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixEditorComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyRichTextComponent extends FieldType<FieldTypeConfig> {}
