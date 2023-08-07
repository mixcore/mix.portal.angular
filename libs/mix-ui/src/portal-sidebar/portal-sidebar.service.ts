import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: `root`,
})
export class PortalSidebarService {
  public selectedPortal$ = new BehaviorSubject<Portal<any> | undefined>(
    undefined
  );

  public addTemplate(template: any) {
    this.selectedPortal$.next(new ComponentPortal(template));
  }
}
