import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';

const entriesMap = new WeakMap();

const ro = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entriesMap.has(entry.target)) {
      const comp = entriesMap.get(entry.target);
      comp._resizeCallback(entry);
    }
  }
});

@Directive({ selector: '[mixResizeObserver]', standalone: true })
export class ResizeObserverDirective implements OnDestroy {
  @Output()
  public resizeChange = new EventEmitter<ResizeObserverEntry>();

  constructor(private el: ElementRef) {
    const target = this.el.nativeElement;
    entriesMap.set(target, this);
    ro.observe(target);
  }

  private _resizeCallback(entry: ResizeObserverEntry) {
    this.resizeChange.emit(entry);
  }

  ngOnDestroy() {
    const target = this.el.nativeElement;
    ro.unobserve(target);
    entriesMap.delete(target);
  }
}
