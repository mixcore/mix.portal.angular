export class TemplateApiDictionary {
  public getTemplateEndpoint = '/mix-portal/mix-template';
  public getTemplateByIdEndpoint(id: string) {
    return `/mix-portal/mix-template/${id}`;
  }
}
