import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiButtonModule } from '@taiga-ui/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'mix-button',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MixButtonComponent {
  @Input() public size: 'l' | 'm' | 's' | 'xs' = 'm';
  @Input() public loading = false;
  @Input() public disabled = false;
  @Input() public type:
    | 'primary'
    | 'secondary-danger'
    | 'danger'
    | 'outline'
    | 'flat'
    | 'secondary' = 'primary';
  @Input() public iconBtn = false;

  constructor(elementRef: ElementRef) {
    fromEvent<PointerEvent>(elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed())
      .subscribe((c) => {
        if (this.disabled || this.loading) {
          c.stopPropagation();
          c.stopImmediatePropagation();
          c.preventDefault();
        }
      });
  }

  public typeMaps = {
    primary: 'primary',
    'secondary-danger': 'secondary-destructive',
    danger: 'accent',
    outline: 'whiteblock',
    flat: 'flat',
    secondary: 'secondary',
  };
}
