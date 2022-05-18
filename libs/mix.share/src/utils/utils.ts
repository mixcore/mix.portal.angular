export class Utils {
  public static isDifferent<T>(value1: T, value2: T): boolean {
    if (value1 == null && value2 == null) {
      return false;
    }
    if (value1 == null && value2 != null) {
      return true;
    }
    if (value1 != null && value2 == null) {
      return true;
    }
    if (typeof value1 !== 'object' && typeof value2 !== 'object') {
      return value1 !== value2;
    }
    if (value1 instanceof Array && value2 instanceof Array) {
      if (value1.length !== value2.length) {
        return true;
      }
    }
    return JSON.stringify(value1) !== JSON.stringify(value2);
  }
}
