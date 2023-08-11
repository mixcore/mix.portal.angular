import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
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
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiRadioBlockModule, TuiTabsModule } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

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
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EntityFormComponent implements OnInit {
  @Input({ required: true }) entity!: MixColumn;
  @Output() entityChange = new EventEmitter<MixColumn>();
  @Output() deleteEntity = new EventEmitter<MixColumn>();

  public activeTabIndex = 0;
  public dataTypes = Object.keys(DataTypeDisplay);
  public dialog = inject(TuiDialogService);
  public dataTypeDisplay = DataTypeDisplay;

  public form = new FormGroup({
    systemName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    dataType: new FormControl('', Validators.required),
  });

  public configurationForm = new FormGroup({
    isEncrypt: new FormControl(false),
    isRequire: new FormControl(false),
    isValid: new FormControl(false),
  });

  ngOnInit() {
    this.form.patchValue(this.entity);
    this.configurationForm.patchValue(this.entity.columnConfigurations);

    this.configurationForm.valueChanges.subscribe((v) => {
      this.changeEntity();
    });

    this.form.valueChanges.subscribe((v) => {
      this.changeEntity();
    });
  }

  public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog.open(content, { size: 'l' }).subscribe();
  }

  public showDataTypeDialog(
    event: Event,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    event.preventDefault();
    event.stopPropagation();

    this.dialog.open(content, { size: 'l' }).subscribe();
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
}
