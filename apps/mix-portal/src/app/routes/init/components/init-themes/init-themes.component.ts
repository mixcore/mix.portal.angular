import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mix-init-themes',
  templateUrl: './init-themes.component.html',
  styleUrls: ['./init-themes.component.scss']
})
export class InitThemesComponent {
  @Input() public loading = false;
  @Output() public themeSubmit: EventEmitter<void> = new EventEmitter();

  public submitTheme(): void {
    this.themeSubmit.emit();
  }
}
