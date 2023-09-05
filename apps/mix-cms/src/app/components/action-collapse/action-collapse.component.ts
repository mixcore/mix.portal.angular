import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MixButtonComponent } from '@mixcore/ui/button';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiGroupModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiBadgeModule,
  TuiCheckboxBlockModule,
  TuiItemsWithMoreModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'mix-action-collapse',
  standalone: true,
  imports: [
    CommonModule,
    TuiItemsWithMoreModule,
    MixButtonComponent,
    TuiDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiBadgeModule,
    TuiHostedDropdownModule,
    TuiCheckboxBlockModule,
    FormsModule,
    TuiGroupModule,
  ],
  templateUrl: './action-collapse.component.html',
  styleUrls: ['./action-collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionCollapseComponent {
  @Input() public actions = [
    {
      label: 'Create',
      key: 'create',
      icon: 'edit',
      place: 'left',
      type: 'primary',
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: 'delete',
      place: 'left',
      type: 'danger',
    },
    {
      label: 'Export',
      key: 'export',
      icon: 'system_update_alt',
      place: 'left',
    },
  ];

  @Input() public actionMaps: { [key: string]: () => void } = {
    create: () => {
      //
    },
    delete: () => {
      //
    },
    export: () => {
      //
    },
  };

  public onClick(key: string) {
    const action = this.actionMaps[key];
    if (action) action();
  }
}
