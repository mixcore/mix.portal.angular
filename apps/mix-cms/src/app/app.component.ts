import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { zoomOutLeftOnLeaveAnimation } from '@mixcore/share/animation';
import { MixEaterEgg } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { LoadingScreenComponent } from '@mixcore/share/components';
import { DomHelper } from '@mixcore/share/helper';
import { ModalService } from '@mixcore/ui/modal';
import { TuiRootModule } from '@taiga-ui/core';
import { filter, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [zoomOutLeftOnLeaveAnimation({ duration: 1000 })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingScreenComponent, TuiRootModule],
})
export class AppComponent implements OnInit {
  public authService = inject(AuthService);
  public router = inject(Router);
  public swUpdate = inject(SwUpdate);
  public eaterEgg = inject(MixEaterEgg);
  public zone = inject(NgZone);
  public modal = inject(ModalService);
  public cdr = inject(ChangeDetectorRef);

  public appAvailable = false;

  public ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      if (this.swUpdate.isEnabled) {
        this.swUpdate.versionUpdates
          .pipe(
            filter(
              (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
            ),
            switchMap(() =>
              this.modal.info(
                'A new version of the application is available. Update now?'
              )
            )
          )
          .subscribe((ok) => {
            if (ok) window.location.reload();
            this.cdr.detectChanges();
          });
      }
    });

    this.authService.initGlobalSettings();
    // if (this.authService.checkAuthorize()) {
    forkJoin([
      this.authService.fetchUserData(),
      this.authService.initCultures(),
    ])
      .pipe(
        switchMap(() => this.authService.initRoles()),
        switchMap(() => this.authService.initPortalsMenu())
      )
      .subscribe({
        next: () => {
          this.authService.isAuthorized$.next(true);
          this.router
            .navigateByUrl(
              this.authService.redirectUrl || DomHelper.getCurrentPathname()
            )
            .then();

          this.authService.clearRedirectUrl();
        },
        error: () => this.enableApp(),
        complete: () => this.enableApp(),
      });
  }

  public enableApp(): void {
    this.appAvailable = true;
  }
}
