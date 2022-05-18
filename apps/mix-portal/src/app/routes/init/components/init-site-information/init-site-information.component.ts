import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Culture, Database, InitTenantModel, SUPPORTED_DATABASE } from '@mix-spa/mix.lib';
import { FormUtils, ShareApiService } from '@mix-spa/mix.share';

@Component({
  selector: 'init-site-information',
  templateUrl: './init-site-information.component.html',
  styleUrls: ['./init-site-information.component.scss']
})
export class InitSiteInformationComponent implements OnInit {
  public step: 'general' | 'database' = 'general';
  public cultures: Culture[] = [];
  public databases: Database[] = ['SQLSERVER', 'SQLITE', 'PostgreSQL', 'MySQL'];
  public defaultConnectionString = 'Data Source=MixContent\\mix-cms.db';
  public siteForm: FormGroup = new FormGroup({
    siteName: new FormControl('', Validators.required),
    culture: new FormControl(null, Validators.required)
  });

  public databaseForm: FormGroup = new FormGroup({
    databaseProvider: new FormControl('SQLITE', Validators.required),
    sqliteDbConnectionString: new FormControl(this.defaultConnectionString, Validators.required)
  });

  @Output() public siteSubmit: EventEmitter<InitTenantModel> = new EventEmitter();

  constructor(private shareApiSrv: ShareApiService) {}
  public dbStringify = (item: Database): string => `${SUPPORTED_DATABASE[item]?.label ?? ''}`;
  public cultureStringify = (item: Culture): string => `${item?.fullName ?? ''}`;
  public ngOnInit(): void {
    this.shareApiSrv.getCultures().subscribe((result: Culture[]) => (this.cultures = result));
  }

  public nextToDatabaseSetting(): void {
    if (FormUtils.validateForm(this.siteForm)) {
      this.step = 'database';
    }
  }

  public backToSiteSetting(): void {
    this.step = 'general';
  }

  public submitForm(): void {
    if (FormUtils.validateForm(this.databaseForm)) {
      const tenantData = <InitTenantModel>{
        siteName: this.siteForm.value['siteName'],
        culture: this.siteForm.value['culture'],
        databaseProvider: this.databaseForm.value['databaseProvider'],
        sqliteDbConnectionString: this.databaseForm.value['sqliteDbConnectionString']
      };

      this.siteSubmit.emit(tenantData);
    }
  }
}
