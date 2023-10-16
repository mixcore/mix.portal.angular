import { Component, Injector, inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AuthService } from '@mixcore/share/auth';
import { DOMAIN_URL$ } from '@mixcore/share/base';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'mix-kanban-root',
  standalone: true,
  template: `<div (click)="toast.show('asd')">123</div>`,
  providers: [
    { provide: DOMAIN_URL$, useExisting: DOMAIN_URL$ },
    { provide: AuthService, useExisting: AuthService },
  ],
})
export class AppComponent {
  toast = inject(HotToastService);
  auth = inject(AuthService);

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mix-kanban', ce);
  }
}
