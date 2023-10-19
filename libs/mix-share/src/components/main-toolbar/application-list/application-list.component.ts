import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApplicationStore } from '@mixcore/share/stores';

@Component({
  selector: 'mix-application-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationListComponent {
  public store = inject(ApplicationStore);

  constructor() {
    // this.store.vm$.pipe(takeUntilDestroyed()).subscribe((v) => {
    //   console.log(v);
    // });
  }
}
