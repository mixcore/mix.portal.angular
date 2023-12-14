import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mixDate', standalone: true })
export class MixUtcDatePipe implements PipeTransform {
  public transform(utcDateString: string | null | Date | undefined) {
    if (
      utcDateString == null ||
      utcDateString == undefined ||
      utcDateString === '' ||
      utcDateString === 'N/A' ||
      utcDateString !== utcDateString
    )
      return utcDateString;

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
