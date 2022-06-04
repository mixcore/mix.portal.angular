import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface TabControl {
  path: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class TabControlService {
  public navControl: TabControl[] = [];
  public navControl$: BehaviorSubject<TabControl[]> = new BehaviorSubject<TabControl[]>([]);
  public index$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public whiteLists: string[] = ['/auth/login'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (this.whiteLists.includes(this.router.url)) return;

      this.navControl = this.navControl.filter(c => c.path !== this.router.url);
      this.navControl.unshift({
        title: this.activatedRoute.snapshot.data['title'],
        path: this.router.url
      });
      this.navControl$.next(this.navControl);
    });
  }

  public nextTab(): void {
    let currentIndex = this.index$.getValue();
    if (currentIndex >= this.navControl.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex = currentIndex + 1;
    }

    this.index$.next(currentIndex);
  }

  public unTab(): void {
    this.index$.next(0);
  }
}
