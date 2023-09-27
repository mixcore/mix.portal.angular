import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTypeDisplay, MixColumn } from '@mixcore/lib/model';
import { FormHelper } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixToggleComponent } from '@mixcore/ui/toggle';
import { DialogService } from '@ngneat/dialog';
import { TuiRadioBlockModule, TuiTabsModule } from '@taiga-ui/kit';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    ReactiveFormsModule,
    MixSelectComponent,
    MixButtonComponent,
    TuiTabsModule,
    MixToggleComponent,
    TuiRadioBlockModule,
    DragDropModule,
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityFormComponent implements OnInit {
  @Input({ required: true }) entity!: MixColumn;
  @Output() entityChange = new EventEmitter<MixColumn>();
  @Output() deleteEntity = new EventEmitter<MixColumn>();

  public activeTabIndex = 0;
  public destroyRef = inject(DestroyRef);
  public dialogSrv = inject(DialogService);

  public dataTypeDisplay = DataTypeDisplay;
  public dataTypeGroups = [
    {
      label: 'Text',
      id: 'text',
      types: [
        DataTypeDisplay.Text,
        DataTypeDisplay.MultilineText,
        DataTypeDisplay.Html,
        DataTypeDisplay.Color,
        DataTypeDisplay.Url,
        DataTypeDisplay.QRCode,
        DataTypeDisplay.PostalCode,
        DataTypeDisplay.Icon,
        DataTypeDisplay.ImageUrl,
        DataTypeDisplay.Password,
        DataTypeDisplay.Guid,
        DataTypeDisplay.CreditCard,
      ],
    },
    {
      label: 'Integer',
      id: 'integer',
      types: [
        DataTypeDisplay.Integer,
        DataTypeDisplay.Double,
        DataTypeDisplay.PhoneNumber,
      ],
    },
    {
      label: 'Date',
      id: 'date',
      types: [DataTypeDisplay.Date, DataTypeDisplay.DateTime],
    },
    {
      label: 'Json',
      id: 'json',
      types: [
        DataTypeDisplay.Json,
        DataTypeDisplay.ArrayMedia,
        DataTypeDisplay.ArrayRadio,
      ],
    },
    {
      label: 'Boolean',
      id: 'boolean',
      types: [DataTypeDisplay.Boolean],
    },
    {
      label: 'Other',
      id: 'other',
      types: [DataTypeDisplay.Upload, DataTypeDisplay.Custom],
    },
  ];

  public form = new FormGroup({
    systemName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    dataType: new FormControl('', Validators.required),
    priority: new FormControl(0, Validators.required),
  });

  public configurationForm = new FormGroup({
    isEncrypt: new FormControl(false),
    isRequire: new FormControl(false),
    isValid: new FormControl(false),
  });

  ngOnInit() {
    this.form.patchValue(this.entity);
    this.configurationForm.patchValue(this.entity.columnConfigurations);

    this.configurationForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.changeEntity();
      });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.changeEntity();
      });

    this.form.controls.displayName.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
      .subscribe(() => {
        this.updateSystemName();
      });
  }

  public showDialog(content: any): void {
    this.dialogSrv.open(content, { size: 'lg' });
  }

  public showDataTypeDialog(event: Event, content: any): void {
    event.preventDefault();
    event.stopPropagation();

    this.dialogSrv.open(content, { resizable: true, size: 'lg' });
  }

  public changeEntity(): void {
    const entity = <MixColumn>{
      ...this.entity,
      ...this.form.getRawValue(),
      columnConfigurations: {
        ...this.entity.columnConfigurations,
        ...this.configurationForm.getRawValue(),
      },
    };

    this.entityChange.emit(entity);
  }

  public validate() {
    return FormHelper.validateForm(this.form);
  }

  public updateSystemName(force = false) {
    if (!this.form.value.displayName) return;
    if (this.form.value.systemName && !force) return;

    const words = this.form.value.displayName.split(' ');
    const camelCaseString = words
      .map(
        (word, index) =>
          (index === 0
            ? word.charAt(0).toLocaleLowerCase()
            : word.charAt(0).toUpperCase()) + word.slice(1)
      )
      .join('');
    const prefix = '';

    this.form.controls.systemName.patchValue(`${prefix}${camelCaseString}`, {
      emitEvent: false,
    });

    this.changeEntity();
  }
}
