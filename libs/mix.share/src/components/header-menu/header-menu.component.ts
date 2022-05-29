import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services';
import { ShareModule } from '../../share.module';
import { ModalService } from '../modal/modal.service';
import { HeaderMenuService } from './header-menu.service';

@Component({
  selector: 'mix-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class HeaderMenuComponent {
  public user$ = this.authService.user$;

  constructor(
    public authService: AuthApiService,
    public headerService: HeaderMenuService,
    private route: Router,
    @Inject(ModalService) private readonly modalService: ModalService
  ) {}

  public logout(): void {
    this.modalService.confirm('Do you want to sign out ?').subscribe(ok => {
      if (ok) this.authService.logout(() => this.route.navigateByUrl('/auth/login'));
    });
  }
}
