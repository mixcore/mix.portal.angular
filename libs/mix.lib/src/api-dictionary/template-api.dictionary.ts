export class TemplateApiDictionary {
  public prefix = '/mix-portal/mix-template';
  public getTemplateEndpoint = this.prefix;
  public getTemplateDefaultEndpoint = `${this.prefix}/default`;
  public getTemplateByIdEndpoint(id: number) {
    return `${this.prefix}/${id}`;
  }
  public deleteTemplateByIdEndpoint(id: number) {
    return `${this.prefix}/${id}`;
  }
}
