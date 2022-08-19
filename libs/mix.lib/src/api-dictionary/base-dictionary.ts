export abstract class BaseMixApiDictionary {
  protected abstract get url(): string;

  public get getDefaultEndpoint() {
    return this.url + 'default';
  }

  public get saveEndpoint() {
    return this.url;
  }

  public get getEndpoint() {
    return this.url;
  }

  public get deleteEndpoint() {
    return this.url;
  }

  public getByIdEndpoint(id: number): string {
    return this.url + id;
  }
}
