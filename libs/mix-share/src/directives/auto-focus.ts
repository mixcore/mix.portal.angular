import { Directive, Input } from '@angular/core';
import { MixInputComponent } from '@mixcore/ui/input';

@Directive({
  selector: '[mixAutoFocus]',
  standalone: true,
})
export class MixAutoFocus {
  @Input('mixAutoFocus')
  autoFocus: boolean | '' = true;

  constructor(public elementRef: MixInputComponent) {}

  ngAfterViewInit() {
    if (this.autoFocus) {
      setTimeout(() => {
        this.elementRef.focus();
      }, 100);
    }
  }
}
