import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiCalendarModule } from '@taiga-ui/core';

@Component({
  selector: 'start-end-date',
  standalone: true,
  imports: [
    CommonModule,
    TippyDirective,
    TuiCalendarModule,
    MixButtonComponent,
  ],
  templateUrl: './start-end-date.component.html',
  styleUrl: './start-end-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartEndDateComponent {
  public value: TuiDay | null = null;
}
