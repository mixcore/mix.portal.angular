import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MetadataQuery,
  MixContentStatus,
  MixOrderBy,
  OrderDisplay,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixSelectComponent } from '@mixcore/ui/select';

@Component({
  selector: 'mix-basic-mix-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixSelectComponent,
    MixDatePickerComponent,
  ],
  templateUrl: './basic-mix-filter.component.html',
  styleUrls: ['./basic-mix-filter.component.scss'],
})
export class BasicMixFilterComponent implements OnInit {
  @Input() public value: Partial<PaginationRequestModel> = {};
  @Output() public valueChange: EventEmitter<PaginationRequestModel> =
    new EventEmitter();

  filterForm = new FormGroup({
    status: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    direction: new FormControl(),
    orderBy: new FormControl(),
  });

  filterOptions: string[] = [
    MixContentStatus.Draft,
    MixContentStatus.Published,
    MixContentStatus.Preview,
    MixContentStatus.Deleted,
  ];

  orderByOptions: string[] = [MixOrderBy.Priority, MixOrderBy.CreatedDateTime];
  directionOptions: string[] = ['Asc', 'Desc'];
  stringify = (value: MixOrderBy) => OrderDisplay[value];
  stringifyMetadata = (value: MetadataQuery) => value?.displayName ?? '';

  ngOnInit() {
    this.filterForm.patchValue(this.value);
    this.filterForm.valueChanges.subscribe((v) => {
      this.valueChange.emit(v);
    });
  }
}
