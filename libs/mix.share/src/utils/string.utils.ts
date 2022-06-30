export class StringUtils {
  public static textToSystemName(value: string): string {
    return value.toLowerCase().split(' ').join('-');
  }
}
