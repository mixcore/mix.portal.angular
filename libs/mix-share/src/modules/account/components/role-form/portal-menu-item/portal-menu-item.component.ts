import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MixDynamicData, PortalMenu } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { FULL_MENU } from '@mixcore/share/auth';
import { FormHelper } from '@mixcore/share/form';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
import { ModalService } from '@mixcore/ui/modal';
import { EditModeDirective, EditableComponent } from '@ngneat/edit-in-place';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'mix-portal-menu-item',
  templateUrl: './portal-menu-item.component.html',
  styleUrls: ['./portal-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    MixButtonComponent,
    EditableComponent,
    EditModeDirective,
    EditModeDirective,
    ReactiveFormsModule,
    MixInputNumberComponent,
  ],
})
export class PortalMenuItemComponent implements OnInit {
  FULL_MENU = inject(FULL_MENU).map((x) => x.url);
  MIX_API = inject(MixApiFacadeService);
  TOAST = inject(HotToastService);
  dialog = inject(TuiDialogService);
  DB_NAME = 'PortalMenu';
  modal = inject(ModalService);

  @Input() item!: PortalMenu;
  @Output() portalMenuAdded = new EventEmitter<PortalMenu>();
  @Output() portalMenuDeleted = new EventEmitter<PortalMenu>();

  defaultFormValue: Record<string, string | null> = {};
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
    priority: new FormControl(),
  });

  public addMenuForm = new FormGroup({
    title: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.form.patchValue(this.item);
    this.defaultFormValue = this.form.getRawValue();
  }

  save() {
    if (FormHelper.validateForm(this.form)) {
      if (!Utils.isDifferent(this.defaultFormValue, this.form.getRawValue()))
        return;

      this.MIX_API.databaseApi
        .saveData(this.DB_NAME, this.item.id, {
          ...this.item,
          ...(this.form.getRawValue() as unknown as MixDynamicData),
        })
        .pipe(
          this.TOAST.observe({
            loading: 'Saving...',
            success: 'Successfully apply your change',
            error: 'Something error, please try again',
          })
        )
        .subscribe(() => {
          this.defaultFormValue = this.form.getRawValue();
        });
    }
  }

  createMenu(dialog: any) {
    if (FormHelper.validateForm(this.form)) {
      this.MIX_API.databaseApi
        .saveData(this.DB_NAME, -1, {
          ...(this.addMenuForm.getRawValue() as unknown as MixDynamicData),
          portalMenuId: this.item.id,
          role: this.item.role,
        })
        .pipe(
          switchMap((item) => {
            return this.MIX_API.databaseApi
              .associateDb(this.DB_NAME, item.id!, this.DB_NAME, this.item.id)
              .pipe(map(() => item));
          }),
          this.TOAST.observe({
            loading: 'Creating...',
            success: 'Successfully apply your change',
            error: 'Something error, please try again',
          })
        )
        .subscribe((result) => {
          this.portalMenuAdded.emit(result as unknown as PortalMenu);
          dialog.complete();
        });
    }
  }

  deleteMenu() {
    this.modal.asKForAction('Are you sure to delete this portal menu ?', () => {
      this.MIX_API.databaseApi
        .deleteData(this.DB_NAME, this.item.id)
        .pipe(
          this.TOAST.observe({
            loading: 'Deleting...',
            success: 'Successfully apply your change',
            error: 'Something error, please try again',
          })
        )
        .subscribe(() => {
          this.portalMenuDeleted.emit(this.item);
        });
    });
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog.open(content, { size: 'auto' }).subscribe();
  }
}
