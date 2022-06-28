import { animate, style, transition, trigger } from '@angular/animations';

export const slideAnimation = trigger('enterAnimation', [
  transition(':enter', [
    style({ transform: 'translate(100%, 0)' }),
    animate('200ms ease', style({ transform: 'translate(0, 0)' }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms', style({ opacity: 0 }))
  ])
]);
