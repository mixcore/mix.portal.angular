export class PageApiDictionary {
  public prefix = '/mix-portal/mix-page-content/';
  public getDefaultPageEndpoint = this.prefix;
  public savePageEndpoint = this.prefix;
  public getPageEndpoint = this.prefix;
  public deletePageEndpoint = this.prefix;
  public getPageById(id: number): string {
    return this.prefix + id;
  }
}
