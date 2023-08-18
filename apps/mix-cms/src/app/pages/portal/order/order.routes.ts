import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order.component';

export const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: ':id',
    component: OrderDetailComponent,
  },
];
