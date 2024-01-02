import { clone, difference, groupBy } from 'remeda';

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

  public static groupBy(array: any[], key: string) {
    return groupBy(array, () => key);
  }
}

export class ObjectUtil {
  public static clone<T>(object: T) {
    return clone(object);
  }

  public static diff(object: object, toCompareObj: object) {
    return JSON.stringify(object) !== JSON.stringify(toCompareObj);
  }

  public static diffArray<T>(v: T[], v2: T[]) {
    return difference(v, v2);
  }

  public static objectToQueryString(
    obj: Record<string, any>,
    parentKey = ''
  ): string {
    const keyValuePairs = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof value === 'object' && value !== null) {
          keyValuePairs.push(ObjectUtil.objectToQueryString(value, fullKey));
        } else {
          keyValuePairs.push(
            encodeURIComponent(fullKey) + '=' + encodeURIComponent(value)
          );
        }
      }
    }

    return keyValuePairs.join('&');
  }
}
