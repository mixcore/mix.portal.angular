import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModel, InitTenantModel } from '@mix-spa/mix.lib';
import { TenancyApiService } from '@mix-spa/mix.share';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'mix-portal-init-page',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent {
  public tenantData!: InitTenantModel;
  public accountData!: AccountModel;
  public step = 0;
  public loading = false;

  constructor(
    public tenancyApi: TenancyApiService,
    private route: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  public siteSubmit(value: InitTenantModel): void {
    this.tenantData = value;
    this.step = 1;
  }

  public accountSubmit(value: AccountModel): void {
    this.accountData = value;
    this.step = 2;
  }

  public themeSubmit(): void {
    this.loading = true;
    this.tenancyApi
      .initFullTenant({
        tenantData: this.tenantData,
        accountData: this.accountData
      })
      .subscribe(() => {
        this.loading = false;
        this.alertService.open('Create tenant successfully', { label: 'Success' }).subscribe();
        this.route.navigateByUrl('/auth/login');
      });
  }
}
