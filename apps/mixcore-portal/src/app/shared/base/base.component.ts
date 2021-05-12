import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export abstract class BaseComponent implements AfterViewInit {
  public initialized: boolean = false;

  constructor(public router: Router) {
    //
  }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  public ngAfterViewInit(): void {
    this.initialized = true;
  }
}
