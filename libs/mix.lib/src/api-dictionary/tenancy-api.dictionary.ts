export class TenancyApiDictionary {
  public prefix = '/mix-tenancy/setup';
  public initFullTenantEndpoint = this.prefix + '/init-full-tenant';
  public getInitStatusEndpoint = this.prefix + '/get-init-status';
  public installThemeEndpoint = this.prefix + '/install';
  public loadThemeEndpoint = this.prefix + '/load-theme';
  public importTheme = this.prefix + '/import-theme';
}
