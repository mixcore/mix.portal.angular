export class PostApiDictionary {
  public prefix = '/mix-portal/mix-post-content/';
  public getDefaultPostEndpoint = this.prefix + `default`;
  public savePostEndpoint = this.prefix;
  public getPostEndpoint = this.prefix;
  public deletePostEndpoint = this.prefix;
  public getPostByIdEndpoint(id: number): string {
    return this.prefix + id;
  }
}
