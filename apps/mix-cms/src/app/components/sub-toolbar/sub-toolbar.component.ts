import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mix-sub-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-toolbar.component.html',
  styleUrls: ['./sub-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MixSubToolbarComponent {
  @Input() title = '';
  @Input() description = '';
}
