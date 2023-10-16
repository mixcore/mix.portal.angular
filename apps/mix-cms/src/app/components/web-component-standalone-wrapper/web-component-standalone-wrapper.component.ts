import {
  ModuleFederationToolsModule,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'mix-web-component-standalone-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, ModuleFederationToolsModule],
  templateUrl: './web-component-standalone-wrapper.component.html',
  styleUrls: ['./web-component-standalone-wrapper.component.scss'],
})
export class WebComponentStandaloneWrapperComponent {
  public activeRoute = inject(ActivatedRoute);
  public item!: WebComponentWrapperOptions;

  constructor() {
    this.activeRoute.data.subscribe((data) => {
      this.item = data as WebComponentWrapperOptions;
    });
  }
}
