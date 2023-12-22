import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '../base';

@Component({
  selector: 'mix-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixCheckboxComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() public id = 'checkbox';
  @Input() public label = '';
  @Output() public checkedChange = new EventEmitter();
  public destroyRef = inject(DestroyRef);

  public get checked(): boolean {
    return this._checked;
  }
  @Input() public set checked(v: boolean) {
    if (v !== this._checked) {
      this._checked = v;
      this.control.patchValue(v, { emitEvent: false });
    }
  }

  private _checked!: boolean;

  ngOnInit() {
    console.log(123);
    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.checkedChange.emit(v));
  }
}
