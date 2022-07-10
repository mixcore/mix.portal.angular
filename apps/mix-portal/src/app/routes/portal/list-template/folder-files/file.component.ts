import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  IGetTemplatesRequest,
  MixTemplateFolder,
  MixTemplateModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { MixTemplateApiService, ShareModule } from '@mix-spa/mix.share';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'mix-folder-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ShareModule, TuiAccordionModule]
})
export class MixFolderFileComponent implements OnInit {
  public open = false;
  @Input() public themeId = 1;
  @Input() folderType: MixTemplateFolder = MixTemplateFolder.Masters;

  public loading$ = new BehaviorSubject<boolean>(true);
  public result$ = new BehaviorSubject<PaginationResultModel<MixTemplateModel>>(
    {
      items: [],
      pagingData: { pageIndex: 0 }
    }
  );

  public defaultQuery$: BehaviorSubject<IGetTemplatesRequest> =
    new BehaviorSubject<IGetTemplatesRequest>({
      themeId: this.themeId,
      folderType: MixTemplateFolder.Layouts,
      pageIndex: 0,
      pageSize: 100
    });

  constructor(private templateApi: MixTemplateApiService) {}

  public ngOnInit(): void {
    this.defaultQuery$
      .pipe(
        switchMap(query => {
          const request = {
            ...query,
            themeId: this.themeId,
            folderType: this.folderType
          };

          this.loading$.next(true);
          return this.templateApi.getTemplates(request);
        })
      )
      .subscribe(result => {
        this.loading$.next(false);
        this.result$.next(result);
      });
  }
}
