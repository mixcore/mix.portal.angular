import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'relativeTimeSpan', standalone: true })
export class RelativeTimeSpanPipe implements PipeTransform {
  public transform(value: string | null) {
    if (value == null || value === '' || value === 'N/A' || value !== value) return value;

    const current: Date = new Date(new Date().toUTCString().substr(0, 25));
    const previous: Date = new Date(value);
    const msPerMinute: number = 60 * 1000;
    const msPerHour: number = msPerMinute * 60;
    const elapsed: number = current.getTime() - previous.getTime();
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else {
      return value;
    }
  }
}
