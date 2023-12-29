import { Directive, ElementRef, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '@mixcore/ui/modal';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[commingSoon]',
  standalone: true,
})
export class ComingSoomDirective {
  @Input() commingSoon: string = 'Feature';

  constructor(public elementRef: ElementRef, public modal: ModalService) {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.modal
          .info(
            '😟 We are sorry for the inconvenience. This feature is still under development.',
            'Coming soon'
          )
          .subscribe();
      });
  }
}
