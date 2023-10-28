import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MixColumn, MixDynamicDataValue } from '@mixcore/lib/model';
import { CompressImageComponent } from '@mixcore/share/components';

@Component({
  selector: 'mix-dynamic-data-display',
  standalone: true,
  imports: [CommonModule, CompressImageComponent],
  templateUrl: './dynamic-data-display.component.html',
  styleUrls: ['./dynamic-data-display.component.scss'],
})
export class DynamicDataDisplayComponent {
  @Input() public mixColumn!: MixColumn;
  @Input() public mixData: MixDynamicDataValue;
}
