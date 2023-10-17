import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: 'dark' | 'light' | string = 'light';

  constructor() {
    this.theme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.setAttribute('mode', this.theme);
  }

  public toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);

    document.documentElement.setAttribute('mode', this.theme);
  }
}
