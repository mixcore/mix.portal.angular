import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixDynamicData,
  MixRole,
  PaginationRequestModel,
  PaginationResultModel,
  PortalMenu,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { FULL_MENU } from '@mixcore/share/auth';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule } from '@mixcore/ui/table';
import { EditableModule } from '@ngneat/edit-in-place';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY_ARRAY, TuiHandler } from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TUI_TREE_CONTENT, TuiTreeModule } from '@taiga-ui/kit';
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { DynamicDbListComponent } from '../dynamic-db-list/dynamic-db-list.component';
import { PortalMenuItemComponent } from './portal-menu-item/portal-menu-item.component';
import { MixRoleTreeItemComponent } from './role-tree-item/role-tree-item.component';

@Component({
  selector: 'mix-role-form',
  standalone: true,
  imports: [
    CommonModule,
    DynamicDbListComponent,
    MixSubToolbarComponent,
    ReactiveFormsModule,
    MixButtonComponent,
    MixInputComponent,
    MixDataTableModule,
    TuiHostedDropdownModule,
    MixFormErrorComponent,
    TuiTreeModule,
    MixRoleTreeItemComponent,
    EditableModule,
    PortalMenuItemComponent,
  ],
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TUI_TREE_CONTENT,
      useValue: new PolymorpheusComponent(MixRoleTreeItemComponent),
    },
  ],
})
export class RoleFormComponent {
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  modal = inject(ModalService);
  dialog = inject(TuiDialogService);
  FULL_MENU = inject(FULL_MENU).map((x) => x.url);

  readonly portalMenuDbName = 'PortalMenu';

  get role() {
    return this._role;
  }
  @Input() set role(v: MixRole) {
    this._role = v;
    this.form.patchValue(this._role);
    this.loadData();

    setTimeout(() => (this._viewInit = false));
    setTimeout(() => (this._viewInit = true));
  }

  _viewInit = false;
  _role!: MixRole;
  showAddMenu = false;
  showUpdateMenu = false;

  control = new FormControl('');

  public addMenuForm = new FormGroup({
    title: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
  });

  public selectedMenu: PortalMenu | undefined = undefined;
  public updateMenuForm = new FormGroup({
    title: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
  });

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  public loadingMenu = signal(false);
  public result = signal(<PaginationResultModel<PortalMenu>>{
    pagingData: {
      pageIndex: 0,
      pageSize: 30,
    },
  });
  public query = signal(<PaginationRequestModel>{
    pageIndex: 0,
    pageSize: 30,
    searchMethod: 'InRange',
    searchColumns: 'Role',
  });

  loadData() {
    this.loadingMenu.set(true);
    this.mixApi.databaseApi
      .getDataByName<PortalMenu>(this.portalMenuDbName, {
        ...this.query(),
        keyword: this.role.name,
        orderBy: 'priority',
        direction: 'Asc',
        queries: [
          {
            fieldName: 'PortalMenuId',
            value: null,
            compareOperator: 'Equal',
            isRequired: false,
          },
        ],
      })
      .pipe(
        switchMap((result) => {
          if (!result.items.length) {
            return of(result);
          }

          const request = result.items.map((data, index) => {
            return this.mixApi.databaseApi
              .getDataByName<PortalMenu>(this.portalMenuDbName, {
                ...this.query(),
                keyword: this.role.name,
                parentId: data.id,
                parentName: this.portalMenuDbName,
                orderBy: 'priority',
                direction: 'Asc',
              })
              .pipe(
                map((v) => {
                  result.items[index].childMenu = [...v.items];

                  return v;
                })
              );
          });

          return forkJoin(request).pipe(map(() => result));
        })
      )
      .subscribe((v) => {
        this.result.set(v);
        this.loadingMenu.set(false);
      });
  }

  createMenu() {
    if (FormHelper.validateForm(this.addMenuForm)) {
      this.mixApi.databaseApi
        .saveData(this.portalMenuDbName, -1, {
          ...(this.addMenuForm.getRawValue() as MixDynamicData),
          role: this.role.name,
        })
        .pipe(
          this.toast.observe({
            loading: 'Creating...',
            success: 'Successfully create data',
            error: 'Something error, please try gain later',
          })
        )
        .subscribe(() => {
          this.loadData();
        });
    }
  }

  deleteMenu(item: MixDynamicData) {
    this.modal.asKForAction('Are you sure to delete this item?', () => {
      if (!item.id) return;
      this.mixApi.databaseApi
        .deleteData(this.portalMenuDbName, item.id)
        .pipe(
          this.toast.observe({
            loading: 'Deleting...',
            success: 'Successfully delete data',
            error: 'Something error, please try gain later',
          })
        )
        .subscribe(() => this.loadData());
    });
  }

  newPortalMenuAdd(portalMenu: PortalMenu, index: number) {
    const currentItems = this.result().items;
    if (!currentItems[index].childMenu?.length) {
      currentItems[index].childMenu = [];
    }

    currentItems[index].childMenu?.push(portalMenu);

    this.result.update((s) => ({
      ...s,
      items: currentItems,
    }));
  }

  deletePortalMenu(portalMenu: PortalMenu, index: number, isRoot: boolean) {
    let currentItems = this.result().items;
    if (isRoot) {
      currentItems = currentItems.filter((x) => x.id !== portalMenu.id);
    } else {
      currentItems[index].childMenu = currentItems[index].childMenu?.filter(
        (x) => x.id !== portalMenu.id
      );
    }

    this.result.update((s) => ({
      ...s,
      items: currentItems,
    }));
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog.open(content, { size: 'auto' }).subscribe();
  }

  readonly handler: TuiHandler<PortalMenu, readonly PortalMenu[]> = (item) =>
    item.childMenu || EMPTY_ARRAY;
}
