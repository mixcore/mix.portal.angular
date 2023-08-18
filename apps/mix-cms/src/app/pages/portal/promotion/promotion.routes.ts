import { Routes } from '@angular/router';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionComponent } from './promotion.component';

export const routes: Routes = [
  {
    path: '',
    component: PromotionComponent,
  },
  {
    path: ':id',
    component: PromotionDetailComponent,
  },
];
