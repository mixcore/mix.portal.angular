import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'mixcore-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'mixcore.examples.menu.todos' },
    { link: 'stock-market', label: 'mixcore.examples.menu.stocks' },
    { link: 'theming', label: 'mixcore.examples.menu.theming' },
    { link: 'crud', label: 'mixcore.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'mixcore.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'mixcore.examples.menu.form' },
    { link: 'notifications', label: 'mixcore.examples.menu.notifications' },
    { link: 'elements', label: 'mixcore.examples.menu.elements' },
    { link: 'authenticated', label: 'mixcore.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
