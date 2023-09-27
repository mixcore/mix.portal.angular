import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MixApiFacadeService } from '@mixcore/share/api';
import { TuiSelectModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-user-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiSelectModule],
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent {
  public mixApi = inject(MixApiFacadeService);
}
