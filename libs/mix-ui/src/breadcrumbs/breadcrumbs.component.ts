import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MixBreadcrumbItemDirective } from './breadcrumbs-item.directive';

@Component({
  selector: 'mix-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixBreadcrumbsComponent {
  @ContentChildren(MixBreadcrumbItemDirective)
  public items!: QueryList<MixBreadcrumbItemDirective>;
  public displayItems = signal<MixBreadcrumbItemDirective[]>([]);

  ngAfterViewInit() {
    this.displayItems.set(this.items.toArray());
  }
}
