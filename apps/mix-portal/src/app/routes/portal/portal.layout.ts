import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AppEvent,
  AppEventService,
  CreationDialogComponent,
  HeaderMenuComponent,
  LocationService,
  MixChatBoxComponent,
  PortalSidebarControlService,
  PortalSidebarHostComponent,
  ShareModule,
  SidebarContainerComponent,
  SideMenuComponent,
  TabControlDialogComponent,
  UniversalSearchComponent
} from '@mix-spa/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './portal.layout.html',
  styleUrls: ['./portal.layout.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderMenuComponent,
    RouterModule,
    ShareModule,
    SideMenuComponent,
    UniversalSearchComponent,
    TabControlDialogComponent,
    MixChatBoxComponent,
    CreationDialogComponent,
    PortalSidebarHostComponent,
    SidebarContainerComponent
  ]
})
export class PortalLayoutComponent {
  @ViewChild('creationTemplate') public createTemplate!: TemplateRef<unknown>;
  public isShowUniversalSearch = false;
  public isShowTab = false;
  public createMode: 'Page' | 'Post' | 'Module' = 'Page';
  public expand$ = new BehaviorSubject<boolean>(true);

  @HostListener('window:keydown.f2', ['$event'])
  showSearch() {
    this.toggleUniversalSearch();
  }

  @HostListener('window:keydown.f3', ['$event'])
  new() {
    this.createNew('Post');
  }

  @HostListener('window:keydown.alt.z', ['$event'])
  tab(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(true);
  }

  @HostListener('window:keyup.alt', ['$event'])
  tabAlt(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(false);
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router,
    private tabControl: LocationService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService,
    private appEvent: AppEventService
  ) {
    this.appEvent.event$.subscribe(event => {
      if (event.type == AppEvent.CreatePage) {
        this.createNew('Page');
      } else if (event.type == AppEvent.CreatePost) {
        this.createNew('Post');
      } else if (event.type == AppEvent.CreateModule) {
        this.createNew('Module');
      } else if (event.type == AppEvent.UniversalSearch) {
        this.toggleUniversalSearch();
      }
    });
  }

  public createNew(type: 'Post' | 'Module' | 'Page'): void {
    this.createMode = type;
    this.sidebarControl.show(this.createTemplate);
  }

  public navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  public toggleUniversalSearch(): void {
    this.isShowUniversalSearch = !this.isShowUniversalSearch;
  }

  public toggleTabControl(show: boolean): void {
    if (this.isShowTab && show) {
      this.tabControl.nextTab();
    }

    this.isShowTab = show;
  }
}
