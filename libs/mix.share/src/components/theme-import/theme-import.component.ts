import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { ThemeModel } from '@mix-spa/mix.lib';

import { ThemeApiService } from '../../services';
import { ShareModule } from '../../share.module';
import { DOMAIN_URL } from '../../token/base-url.token';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'mix-theme-import',
  templateUrl: './theme-import.component.html',
  styleUrls: ['./theme-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ShareModule]
})
export class ThemeImportComponent {
  public activeItemIndex = 0;
  public themeListVm$ = this.themeApiService.getTheme();
  public currentSelectedTheme: ThemeModel | null = null;

  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  @Output() public themeSelect: EventEmitter<ThemeModel> = new EventEmitter();

  constructor(
    public themeApiService: ThemeApiService,
    @Inject(ModalService) private readonly modalService: ModalService,
    @Inject(DOMAIN_URL) public domain: string
  ) {}

  public selectTheme(value: ThemeModel): void {
    this.currentSelectedTheme = value;
  }

  public onCancelClick(): void {
    if (this.currentSelectedTheme) {
      this.modalService.confirm('Do you want to cancel?').subscribe(ok => {
        if (ok) this.cancel.emit();
      });
    } else {
      this.cancel.emit();
    }
  }

  public onUseThemeClick(): void {
    if (!this.currentSelectedTheme) return;

    this.themeSelect.emit(this.currentSelectedTheme);
    this.cancel.emit();
  }
}
