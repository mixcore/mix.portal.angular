import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'mix-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixButtonComponent {
  @Input() public size: 'l' | 'm' | 's' | 'xs' = 's';
  @Input() public loading = false;
  @Input() public disabled = false;
  @Input() public type:
    | 'primary'
    | 'secondary-danger'
    | 'danger'
    | 'outline'
    | 'flat'
    | 'secondary'
    | 'icon' = 'primary';
  @Input() public iconBtn = false;
  @Input() public largeBtn = false;

  constructor(elementRef: ElementRef, zone: NgZone) {
    zone.runOutsideAngular(() => {
      fromEvent<PointerEvent>(elementRef.nativeElement, 'click')
        .pipe(takeUntilDestroyed())
        .subscribe((c) => {
          if (this.disabled || this.loading) {
            c.stopPropagation();
            c.stopImmediatePropagation();
            c.preventDefault();
          }
        });
    });
  }

  public typeMaps = {
    primary: 'primary',
    'secondary-danger': 'secondary-destructive',
    danger: 'accent',
    outline: 'btn-outline',
    flat: 'flat',
    secondary: 'secondary',
    icon: 'icon',
  };
}
