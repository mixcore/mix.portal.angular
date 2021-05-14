import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { MenuItem } from '../../models/sidebar-item.model';

@Component({
  selector: 'mix-collapse-button',
  templateUrl: './collapse-button.component.html',
  styleUrls: ['./collapse-button.component.scss'],
})
export class CollapseButtonComponent implements AfterViewInit {
  @Input() public item: MenuItem;
  @Input() public active: boolean = false;
  @Input() set miniSize(v: boolean) {
    if (v === this._miniSize || !this.initialized) {
      return;
    }

    this._miniSize = v;
    if (this._miniSize) {
      this.expanded = false;
    }
  }
  get miniSize(): boolean {
    return this._miniSize;
  }

  @Input() set expanded(v: boolean) {
    if (v !== this._expanded && this.initialized) {
      this._expanded = v;
      this.onCollapse();
    }
  }
  get expanded(): boolean {
    return this._expanded;
  }

  @ViewChild('childcontainer') childContaierEl: ElementRef;
  @ViewChildren('action') actionEls: QueryList<ElementRef>;

  public initialized: boolean = false;

  private _expanded: boolean = false;
  private _miniSize: boolean = false;

  constructor() {
    //
  }

  public ngAfterViewInit(): void {
    this.initialized = true;
  }

  public onCollapseClick(): void {
    if (this.item.actions?.length === 1) {
      this.item.actions[0].action();
      return;
    }

    if (this.miniSize) {
      return;
    }

    this.expanded = !this.expanded;
  }

  public onCollapse(): void {
    if (!this.item.actions) {
      return;
    }

    if (this.expanded) {
      const totalHeight = this.actionEls
        .map((v) => v.nativeElement.offsetHeight as number)
        .reduce((a, b) => a + b, 0);

      this.childContaierEl.nativeElement.setAttribute(
        'style',
        `height: ${totalHeight}px`
      );
    } else {
      this.childContaierEl.nativeElement.setAttribute('style', 'height: 0px');
    }
  }
}
