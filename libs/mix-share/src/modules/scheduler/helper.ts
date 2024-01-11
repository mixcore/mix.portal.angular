import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatJobName',
  pure: true,
  standalone: true,
})
export class FormatJobNamePipe implements PipeTransform {
  transform(inputString: string) {
    let formattedString = inputString.replace('Mix.Scheduler.Domain.Jobs.', '');
    formattedString = formattedString
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase();
    formattedString = formattedString.replace(/^\w|\s\w/g, function (match) {
      return match.toUpperCase();
    });

    return formattedString;
  }
}
