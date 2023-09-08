import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'mix-custom-action-cell',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  templateUrl: './custom-action-cell.component.html',
  styleUrls: ['./custom-action-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomActionCellComponent implements ICellRendererAngularComp {
  public cellValue!: string;

  public agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  public refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  public btnClick() {
    console.log(123);
  }

  public getValueToDisplay(params: ICellRendererParams) {
    console.log(params);
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
