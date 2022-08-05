import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderMenuService {
  public title$: BehaviorSubject<string> = new BehaviorSubject('');

  public setTitle(text: string): void {
    this.title$.next(text);
  }

  public hideTitle(): void {
    this.title$.next('');
  }
}
