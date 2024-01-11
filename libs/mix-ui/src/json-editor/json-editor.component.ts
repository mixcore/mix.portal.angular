import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { FormlyModule } from '@ngx-formly/core';
import { JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';

@Component({
  selector: 'mix-json-editor',
  standalone: true,
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    CommonModule,
    NgJsonEditorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MixJsonEditorComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  public editorOptions: JsonEditorOptions = new JsonEditorOptions();

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    public override readonly ngControl: NgControl | null
  ) {
    super(ngControl);
    this.editorOptions.modes = [];
    this.editorOptions.mode = 'tree';
    this.editorOptions.enableTransform = false;
    this.editorOptions.enableSort = false;
    this.editorOptions.expandAll = true;
  }
}
