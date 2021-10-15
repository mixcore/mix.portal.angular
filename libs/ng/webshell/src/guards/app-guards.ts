import { CanActivate, Router } from '@angular/router';

import { InitApiService } from '@mix-portal/ng/cms-api';
import { InitStatus } from '@mix-portal/ng/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PortalGuard implements CanActivate {
  constructor(private initApiService: InitApiService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> {
    return this.initApiService.getInitStatus().pipe(
      map((res: InitStatus) => {
        if (res === InitStatus.InitAccount) {
          return true;
        } else {
          this.router.navigateByUrl('init');

          return false;
        }
      })
    );
  }
}
