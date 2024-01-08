import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import moment from 'moment-timezone';

import { CommonModule } from '@angular/common';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MixInputComponent } from '../input/input.component';
import { ICronData, NgxCronService, Period } from './cron.service';

@Component({
  selector: 'mix-input-cron',
  templateUrl: './input-cron.component.html',
  styleUrls: ['./input-cron.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    ReactiveFormsModule,
    MixInputComponent,
    NgxMaterialTimepickerModule,
    FormsModule,
    TippyDirective,
  ],
  providers: [NgxCronService],
})
export class MixInputCronComponent implements OnChanges, OnInit {
  @Input()
  set cron(val: string) {
    this.setCron(val);
    this._cron = val;
    this.cronChange.emit(this._cron);
    this.invalidState.emit(this.invalid);
  }
  get cron(): string {
    return this._cron;
  }

  @Input()
  allowedPeriods = NgxCronService.PERIODKEYS;

  @Input()
  allowQuartz = true;

  @Input()
  language = 'en';

  @Input()
  cronValidateConfigOverrides = NgxCronService.CRON_VALIDATE_CONFIG_OVERRIDES;

  @HostBinding('attr.disabled')
  @Input()
  get disabled() {
    return this._disabled ? true : null;
  }
  set disabled(val) {
    this._disabled = !!val;
  }

  @Input()
  timezone!: string;

  @Input()
  set disableTimezoneDisplay(val: boolean) {
    this._disableTimezoneDisplay = val;
  }
  get disableTimezoneDisplay() {
    return this._disableTimezoneDisplay || !this.timezone;
  }

  periods = NgxCronService.PERIODKEYS;
  dows = NgxCronService.DOWS;
  months = NgxCronService.MONTHS;
  predefined = NgxCronService.PERIODS;
  readonly periodForm = new FormGroup({
    period: new FormControl(Period.Hourly, { nonNullable: true }),
  });

  @HostBinding('class.invalid')
  invalid = false;

  @Output() cronChange: EventEmitter<any> = new EventEmitter();
  @Output() invalidState: EventEmitter<any> = new EventEmitter();

  get description() {
    return this.cronData.description;
  }

  get timeFormat() {
    return this.timezone ? 'h:mm A Z' : 'h:mm A';
  }

  _allowedPeriods: Period[] = NgxCronService.PERIODKEYS;

  disableCustomInput = false;

  cronData: ICronData;
  time: string = '12:00 AM';

  private _cron = '0 * * * *';
  private _disabled = false;
  private _disableTimezoneDisplay!: boolean;

  constructor(public cronService: NgxCronService) {
    this.cronService.setTimezone(this.timezone);
    this.cronData = {
      description: this.cronService.toString('0 * * * *'),
      period: Period.Hourly,
      valid: true,
      seconds: 0,
      secondInterval: 1,
      minute: 0,
      minuteInterval: 1,
      weekday: 'Sunday',
      day: 1,
      month: 'January',
      time: cronService.getMidnight(),
      isQuartz: false,
      daysMax: 31,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this._cron = this.getCron();
    this.setDescription(this._cron);

    if ('timezone' in changes) {
      this.cronService.setTimezone(this.timezone);
    }

    if (
      'allowedPeriods' in changes ||
      'allowQuartz' in changes ||
      'language' in changes
    ) {
      this._allowedPeriods = this.allowedPeriods.filter((k) => {
        const i = this.periods.indexOf(k);
        if (i < 0) {
          return false;
        }
        if (!this.allowQuartz && this.predefined[k].quartz) {
          return false;
        }
        return true;
      }) as Period[];

      // if current period is not one of the allowed periods, set period to custom
      if (
        this.cronData.period !== Period.Custom &&
        !(this._allowedPeriods.indexOf(this.cronData.period) > -1)
      ) {
        this.cronData.period = Period.Custom;
        this._cron = this.getCron();
        this.setDescription(this._cron);
      }

      this.disableCustomInput = this._allowedPeriods.indexOf(Period.Custom) < 0;
    }
  }

  ngOnInit(): void {
    this.time = this.cronData!.time!.format(this.timeFormat);
    this.periodForm.controls.period.valueChanges.subscribe((v) => {
      this.cronData.period = v;
      this.cronDataChanged();
    });
  }

  cronDataChanged() {
    this._cron = this.getCron();
    this.time = this.cronData!.time!.format(this.timeFormat);
    this.setDescription(this._cron);
    this.cronChange.emit(this._cron);
    this.invalidState.emit(this.invalid);
  }

  onBlurDateTimeChanged(event: any) {
    const dateTime = event?.currentTarget?.value;
    if (!dateTime) {
      this.cronData.time = this.cronService.getMidnight();
    }
    this.cronDataChanged();
  }

  onValueChange(value: any) {
    if (value) {
      const m = this.timezone
        ? moment.tz(value, ['h:mm A', 'h:mm A Z'], this.timezone)
        : moment(value, ['h:mm A']);
      if (m.isValid()) {
        this.cronData.time = m;
        this.cronDataChanged();
      }
      this.time = value;
    } else {
      this.cronData.time = this.cronService.getMidnight();
    }
  }

  onDateTimeSelected(dateTime: Date) {
    if (!dateTime) {
      this.cronData.time = this.cronService.getMidnight();
    }
    this.cronDataChanged();
  }

  private setDescription(cron: string) {
    const c = this.cronService.getCronData(
      cron,
      this.cronData.period,
      this.language,
      this.cronValidateConfigOverrides
    );

    if (this.cronData.period !== 'Custom') {
      this.cronData.period = c.period;
    }

    if (c.isQuartz && !this.allowQuartz) {
      const result = this.cronService.validateCronExpression(
        cron,
        false,
        this.cronValidateConfigOverrides
      );
      c.description = result?.error || '';
      c.valid = !!result?.isValid;
    }

    this.cronData.description = c.description;
    this.cronData.valid = c.valid;
    this.cronData.daysMax = c.daysMax || this.cronData.daysMax;

    this.invalid = !c.valid;
  }

  /**
   * Set the component state based on the cron
   */
  private setCron(cron: string) {
    const data = this.cronService.getCronData(
      cron,
      this.cronData.period,
      this.language,
      this.cronValidateConfigOverrides
    );

    if (this.cronData.period !== 'Custom') {
      this.cronData.period = data.period;
    }

    if (data.isQuartz && !this.allowQuartz) {
      const { error, isValid } = this.cronService.validateCronExpression(
        cron,
        false,
        this.cronValidateConfigOverrides
      )!;
      data.description = error;
      data.valid = isValid;
    }

    // copy only defined to local state
    for (const key of Object.keys(data)) {
      if ((data as any)[key] !== undefined && (data as any)[key] !== null) {
        (this.cronData as any)[key] = (data as any)[key];
      }
    }

    this.invalid = !data.valid;
  }

  /**
   * Get the cron string from component state
   * Only used for non-custom periods
   */
  public getCron(): string {
    return this.cronService.getCronFromCronData({
      ...this.cronData,
      expression: this.cron,
    });
  }
}
