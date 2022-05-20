import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InitStep } from '@mix-spa/mix.lib';
import { AuthApiService, TenancyApiService } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-spa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoading = true;

  constructor(private tenantApi: TenancyApiService, private route: Router, private auth: AuthApiService) {
    this.checkSystem();
  }

  private checkSystem(): void {
    this.tenantApi.getInitStatus().subscribe((res: InitStep) => {
      if (res === InitStep.Blank) {
        this.route.navigateByUrl('/init');
        this.isLoading = false;
        return;
      } else {
        this.initAuthorization();
      }
    });
  }

  private initAuthorization(): void {
    this.auth.fetchUserInfo().subscribe({
      next: res => {
        this.auth.user$.next(res);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
