import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../../../services/helper/tab-control.service';
import { ShareModule } from '../../../share.module';

@Component({
  selector: 'mix-tab-control-dialog',
  templateUrl: './tab-control.component.html',
  styleUrls: ['./tab-control.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class TabControlDialogComponent implements OnDestroy {
  public item$ = this.tabControl.navControl$;
  public index$ = this.tabControl.index$;

  constructor(public tabControl: LocationService, public router: Router) {}

  public ngOnDestroy(): void {
    const tabControls = this.item$.getValue();
    const index = this.index$.getValue();

    if (index > tabControls.length) return;
    if (tabControls[index].path == this.router.url) return;

    this.router.navigateByUrl(tabControls[index].path);
    this.tabControl.unTab();
  }
}
