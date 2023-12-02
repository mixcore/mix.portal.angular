import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ComingSoomDirective } from '@mixcore/share/directives';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TippyDirective } from '@ngneat/helipopper';

@Component({
  selector: 'mix-vertical-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    TippyDirective,
    ComingSoomDirective,
  ],
  templateUrl: './database-vertical-toolbar.component.html',
  styleUrl: './database-vertical-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseVerticalToolbarComponent {
  @Output() public rowHeightChange = new EventEmitter<number>();
  @Output() public addNewDb = new EventEmitter();

  public sizeOptions = [
    {
      value: 1,
      label: 'Default row height',
    },

    {
      value: 1.5,
      label: 'Medium row height',
    },

    {
      value: 2,
      label: 'Large row height',
    },
    {
      value: 3,
      label: 'Big row height',
    },
  ];
}
