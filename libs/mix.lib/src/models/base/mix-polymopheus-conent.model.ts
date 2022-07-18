import { Culture } from '../src/cultute.model';

export interface IMixPolymopheusContent {
  title: string;
  thumbnail?: string;
  cultures?: Culture;
  images?: string;
  icon?: string;
  specificulture?: string;
}
