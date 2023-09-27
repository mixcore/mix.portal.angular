import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputInlineModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-inline-input',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputInlineModule,
    MixButtonComponent,
    ReactiveFormsModule,
    TuiAutoFocusModule,
  ],
  templateUrl: './inline-input.component.html',
  styleUrls: ['./inline-input.component.scss'],
})
export class MixInlineInputComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() public override placeHolder = 'Type something';
  public editing = false;

  public toggleEditTitle() {
    this.editing = !this.editing;
  }

  public onFocusedChange(focused: boolean): void {
    if (!focused) this.editing = false;
  }
}
