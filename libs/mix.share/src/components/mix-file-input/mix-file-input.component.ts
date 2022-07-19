import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import {
  TuiFileLike,
  TuiFilesModule,
  TuiInputFilesModule
} from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'mix-files-input',
  templateUrl: './mix-file-input.component.html',
  styleUrls: ['./mix-file-input.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputFilesModule,
    TuiFilesModule
  ],
  standalone: true
})
export class MixFileInputComponent {
  public control = new FormControl();
  public rejectedFiles$ = new Subject<TuiFileLike | null>();

  public onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  public removeFile(): void {
    this.control.setValue(null);
  }

  public clearRejected(): void {
    this.rejectedFiles$.next(null);
  }
}
