export class DateUtils {
  public static FormatDateString(utcDateString: string) {
    if (
      typeof utcDateString == 'string' &&
      utcDateString.indexOf('Z') === -1 &&
      utcDateString.indexOf('+') === -1
    ) {
      utcDateString += 'Z';
    }

    return utcDateString;
  }
}
