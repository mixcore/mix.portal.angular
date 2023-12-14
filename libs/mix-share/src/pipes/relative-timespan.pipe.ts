import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'relativeTimeSpan', standalone: true })
export class RelativeTimeSpanPipe implements PipeTransform {
  public transform(value: string | null | Date | undefined) {
    if (value == null || value === '' || value === 'N/A' || value !== value)
      return value;

    const current: Date = new Date();
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

@Pipe({ name: 'relativeTime', standalone: true })
export class RelativeTimePipe implements PipeTransform {
  public transform(value: string | null | Date | undefined) {
    if (value == null || value === '' || value === 'N/A' || value !== value)
      return value;

    const previous: Date = new Date(value);

    return timeSince(previous);
  }
}

export function timeSince(date: Date) {
  const seconds = Math.floor(((new Date() as any) - (date as any)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }

  return Math.floor(seconds) + ' seconds ago';
}
