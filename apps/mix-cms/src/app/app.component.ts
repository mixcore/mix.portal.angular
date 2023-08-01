import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { zoomOutLeftOnLeaveAnimation } from '@mixcore/share/animation';
import { MixEaterEgg } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [zoomOutLeftOnLeaveAnimation({ duration: 1000 })],
})
export class AppComponent implements OnInit {
  public authService = inject(AuthService);
  public router = inject(Router);
  public swUpdate = inject(SwUpdate);
  public eaterEgg = inject(MixEaterEgg);

  public appAvailable = false;

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
          )
        )
        .subscribe(() => {
          if (
            confirm(
              'A new version of the application is available. Update now?'
            )
          ) {
            window.location.reload();
          }
        });
    }

    this.authService
      .fetchUserData()
      .pipe(
        switchMap(() => this.authService.initRoles()),
        switchMap(() => this.authService.initCultures()),
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
