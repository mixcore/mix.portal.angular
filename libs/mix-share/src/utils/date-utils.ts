export class DateUtils {
  public static setToStartOfDay(date: Date): Date {
    const output = new Date(date);
    output.setHours(0, 0, 0, 0);

    return output;
  }
}
