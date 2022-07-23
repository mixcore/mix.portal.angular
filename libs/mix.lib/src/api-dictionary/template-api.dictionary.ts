export class TemplateApiDictionary {
  public prefix = '/mix-portal/mix-template';
  public getTemplateEndpoint = this.prefix;
  public getTemplateByIdEndpoint(id: string) {
    return `${this.prefix}/${id}`;
  }
}
