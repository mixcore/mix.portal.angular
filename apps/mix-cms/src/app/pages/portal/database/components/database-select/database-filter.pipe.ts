import { Pipe, PipeTransform } from '@angular/core';
import { MixDatabase } from '@mixcore/lib/model';

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class DatabaseFilterPipe implements PipeTransform {
  transform(searchText: string | null, list: MixDatabase[]): MixDatabase[] {
    if (!searchText) return list;

    return list.filter((d) =>
      d.displayName
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    );
  }
}
