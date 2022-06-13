import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MixContentStatus } from '@mix-spa/mix.lib';

@Component({
  selector: 'mix-status-indicator [status]',
  templateUrl: './mix-status-indicator.component.html',
  styleUrls: ['./mix-status-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MixStatusIndicatorComponent {
  @Input() public status!: MixContentStatus;

  public readonly option: Record<MixContentStatus, { label: string; color: string }> = {
    Published: {
      label: 'Published',
      color: '#4BD28F'
    },
    Deleted: {
      label: 'Deleted',
      color: '#FF4D4D'
    },
    Draft: {
      label: '#D8E2E9',
      color: 'green'
    },
    Schedule: {
      label: 'Schedule',
      color: '#FFAA04'
    },
    Preview: {
      label: 'Preview',
      color: '#FFAA04'
    }
  };

  constructor() {
    //
  }
}
