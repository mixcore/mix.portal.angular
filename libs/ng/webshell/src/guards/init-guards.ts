import { CanActivate, Router } from '@angular/router';

import { InitApiService } from '@mix-portal/ng/cms-api';
import { InitStatus } from '@mix-portal/ng/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InitGuard implements CanActivate {
  public hasChecked: boolean = false;

  constructor(private initApiService: InitApiService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> {
    return this.initApiService.getInitStatus().pipe(
      map((res: InitStatus) => {
        if (res === InitStatus.InitAccount) {
          this.router.navigateByUrl('');

          return false;
        }

        if (this.hasChecked) {
          return true;
        }

        let isValidRoute: boolean = true;
        switch (res) {
          case InitStatus.Blank:
            isValidRoute = true;
            this.hasChecked = true;
            this.router.navigateByUrl('init');
            break;
          case InitStatus.InitSite:
            isValidRoute = true;
            this.hasChecked = true;
            this.router.navigateByUrl('init/step2');
            break;
        }

        return isValidRoute;
      })
    );
  }
}
