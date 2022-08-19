import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiToggleModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements OnInit {
  @Input() public checked = false;
  @Input() public set disabled(value: boolean) {
    this._disabled = value;
    this._disabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });
  }
  @Output() public checkedChange: EventEmitter<boolean> = new EventEmitter();

  public _disabled = false;
  public control: FormControl = new FormControl(this.checked);

  ngOnInit(): void {
    this.control.patchValue(this.checked);
    this.control.valueChanges.subscribe(value =>
      this.checkedChange.emit(value)
    );
  }
}
