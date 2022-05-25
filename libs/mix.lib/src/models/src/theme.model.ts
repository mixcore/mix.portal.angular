export class ThemeModel {
  public id!: string;
  public title!: string;
  public description: string | undefined;
  public thumbnailImg!: string;
  public imageUrl!: string;
  public createdBy!: string;
  public content!: string;
  public excerpt?: string;
}
