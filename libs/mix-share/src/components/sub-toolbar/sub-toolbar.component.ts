import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';

@Component({
  selector: 'mix-sub-toolbar',
  standalone: true,
  imports: [CommonModule, SkeletonLoadingComponent],
  templateUrl: './sub-toolbar.component.html',
  styleUrls: ['./sub-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MixSubToolbarComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() loading = false;
  @Input() titleTpl?: TemplateRef<unknown>;
}
