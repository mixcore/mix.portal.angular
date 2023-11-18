export type RecordableKeys<T> = {
  // for each key in T
  [K in keyof T]: T[K] extends string | number | symbol // is the value a valid object key?
    ? // Yes, return the key itself
      K
    : // No. Return `never`
      never;
}[keyof T];

export class ArrayUtil {
  public static toRecord<
    T extends { [P in RecordableKeys<T>]: string | number | symbol },
    K extends RecordableKeys<T>
  >(array: T[], selector: K): Record<T[K], T> {
    return array.reduce(
      (acc, item) => ((acc[item[selector]] = item), acc),
      {} as Record<T[K], T>
    );
  }

  public static removeAtIndex(array: any[], index: number) {
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
      return array;
    } else {
      console.error('Index is out of bounds.');
      return array;
    }
  }
}
