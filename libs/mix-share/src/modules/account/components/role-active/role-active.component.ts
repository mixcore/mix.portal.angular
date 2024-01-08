import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MixRole } from '@mixcore/lib/model';
import { MixToggleComponent } from '@mixcore/ui/toggle';

@Component({
  selector: 'role-active',
  standalone: true,
  imports: [CommonModule, MixToggleComponent, ReactiveFormsModule],
  templateUrl: './role-active.component.html',
  styleUrl: './role-active.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleActiveComponent {
  @Output() public activeChange = new EventEmitter<boolean>();
  @Input() public role!: MixRole;
  @Input() public set active(value: boolean) {
    this._active = value;
    this.activeForm.patchValue(value, { emitEvent: false });
  }
  public get active() {
    return this._active;
  }
  private _active: boolean = false;

  public activeForm = new FormControl(this.active);

  constructor() {
    this.activeForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.activeChange.emit(Boolean(v));
    });
  }
}
