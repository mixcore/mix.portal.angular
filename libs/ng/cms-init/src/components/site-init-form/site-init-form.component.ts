import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatabaseType, FormUtils, ISelectOption, ifValidator } from '@mix-portal/ng/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInitSiteRequest, InitApiService } from '@mix-portal/ng/cms-api';

import { CultureStore } from './culture.store';
import { Router } from '@angular/router';

@Component({
  selector: 'site-init-form',
  templateUrl: './site-init-form.component.html',
  styleUrls: ['./site-init-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteInitFormComponent {
  public initSiteForm!: FormGroup;
  public dbTypeSelectOptions: ISelectOption<DatabaseType>[] = [
    {
      label: 'Microsoft SQL Server',
      value: DatabaseType.MicrosoftSQLServer
    },
    {
      label: 'MySQL Database',
      value: DatabaseType.MySQL
    },
    {
      label: 'PostgreSQL Database',
      value: DatabaseType.PostgreSQL
    },
    {
      label: 'SQLite Database',
      value: DatabaseType.SQLite
    }
  ];

  constructor(private fb: FormBuilder, public siteFormStore: CultureStore, private initApi: InitApiService, private route: Router) {}

  public ngOnInit(): void {
    this.initSiteForm = this.fb.group({
      siteName: [null, Validators.required],
      culture: [null, Validators.required],
      serverProvider: [DatabaseType.MySQL, Validators.required],
      sqliteDbConnectionString: [`Data Source=MixContent\\mix-cms.db`, ifValidator(() => this.isSQLLiteDb, Validators.required)],
      databaseName: [null, ifValidator(() => !this.isSQLLiteDb, Validators.required)],
      databasePort: [null, ifValidator(() => !this.isSQLLiteDb, Validators.required)],
      databaseUser: [null, ifValidator(() => !this.isSQLLiteDb, Validators.required)],
      databasePassword: [null, ifValidator(() => !this.isSQLLiteDb, Validators.required)],
      databaseServer: [null, ifValidator(() => !this.isSQLLiteDb, Validators.required)]
    });

    this.siteFormStore.culturesState$.subscribe(value => {
      if (value.data.length) {
        this.initSiteForm.controls['culture'].patchValue(value.data[0]);
      }
    });
  }

  public get isSQLLiteDb(): boolean {
    if (this.initSiteForm) {
      return this.initSiteForm.controls['serverProvider'].value === DatabaseType.SQLite;
    }

    return true;
  }

  public submitSiteForm(): void {
    const isValid = FormUtils.validateForm(this.initSiteForm);
    if (!isValid) {
      return;
    }

    const request = <IInitSiteRequest>{
      siteName: this.initSiteForm.controls.siteName.value,
      culture: this.initSiteForm.controls.culture.value,
      databaseProvider: this.initSiteForm.controls.serverProvider.value
    };
    if (request.databaseProvider === DatabaseType.SQLite) {
      request.sqliteDbConnectionString = this.initSiteForm.controls.sqliteDbConnectionString.value;
    } else {
      request.databaseName = this.initSiteForm.controls.databaseName.value;
      request.databaseServer = this.initSiteForm.controls.databaseServer.value;
      request.databaseUser = this.initSiteForm.controls.databaseUser.value;
      request.databasePassword = this.initSiteForm.controls.databasePassword.value;
      request.databasePort = this.initSiteForm.controls.databasePort.value;
    }

    this.initApi.initSite(request, { shouldShowSpinner: true }).subscribe(res => {
      this.route.navigateByUrl('init/step2');
    });
  }
}
