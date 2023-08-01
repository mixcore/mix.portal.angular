import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataType, MixColumn } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixToggleComponent } from '@mixcore/ui/toggle';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
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
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
})
export class EntityFormComponent implements OnInit {
  @Input({ required: true }) entity!: MixColumn;
  @Output() entityChange = new EventEmitter<MixColumn>();

  activeTabIndex = 0;
  dataTypes = Object.keys(DataType);
  dialog = inject(TuiDialogService);

  form = new FormGroup({
    systemName: new FormControl(''),
    displayName: new FormControl(''),
    dataType: new FormControl(''),
  });

  configurationForm = new FormGroup({
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

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
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
}
