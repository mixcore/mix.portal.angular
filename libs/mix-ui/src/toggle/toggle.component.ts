import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { TuiToggleModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-toggle',
  standalone: true,
  imports: [CommonModule, TuiToggleModule, ReactiveFormsModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class MixToggleComponent
  extends BaseTextControl<boolean>
  implements ControlValueAccessor, OnInit
{
  @Input() checked = false;
  public override defaultValue = false;

  ngOnInit() {
    this.defaultControl.patchValue(this.checked);
  }
}
