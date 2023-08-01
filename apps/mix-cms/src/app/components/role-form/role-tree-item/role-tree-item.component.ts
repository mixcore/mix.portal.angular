/* eslint-disable @angular-eslint/no-host-metadata-property */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiTreeItemContentComponent, TuiTreeModule } from '@taiga-ui/kit';

@Component({
  selector: `mix-role-tree-item`,
  templateUrl: './role-tree-item.component.html',
  styleUrls: [`./role-tree-item.component.scss`],
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiTreeModule],
})
export class MixRoleTreeItemComponent extends TuiTreeItemContentComponent {
  get icon(): string {
    return this.isExpanded && this.isExpandable
      ? `tuiIconChevronDownLarge`
      : `tuiIconChevronRightLarge`;
  }
}
