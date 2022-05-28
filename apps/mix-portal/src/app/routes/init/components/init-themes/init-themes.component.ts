import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ThemeModel } from '@mix-spa/mix.lib';
import { ShareModule, ThemeApiService, ThemeImportComponent } from '@mix-spa/mix.share';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'mix-init-themes',
  templateUrl: './init-themes.component.html',
  styleUrls: ['./init-themes.component.scss'],
  standalone: true,
  imports: [ShareModule, ThemeImportComponent]
})
export class InitThemesComponent {
  @Input() public loading = false;
  @Output() public themeSubmit: EventEmitter<ThemeModel | null> = new EventEmitter();
  public currentSelectedTheme: ThemeModel | null = null;

  constructor(public themeApi: ThemeApiService, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {}

  public submitTheme(): void {
    this.themeSubmit.emit(this.currentSelectedTheme);
  }

  public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  public onThemeChoose(value: ThemeModel): void {
    this.currentSelectedTheme = value;
  }
}
