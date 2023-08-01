import { Directive, ElementRef, HostListener } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'img', standalone: true })
export class ImageHandleDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  private onError() {
    this.el.nativeElement.src = 'assets/images/image_placeholder.jpg';
  }

  @HostListener('load')
  private onLoad() {
    //
  }
}
