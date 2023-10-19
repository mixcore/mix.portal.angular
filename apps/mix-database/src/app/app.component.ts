import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { zoomOutLeftOnLeaveAnimation } from '@mixcore/share/animation';
import { MixEaterEgg } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { ModalService } from '@mixcore/ui/modal';
import { filter, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [zoomOutLeftOnLeaveAnimation({ duration: 1000 })],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
              this.authService.redirectUrl || window.location.pathname
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
