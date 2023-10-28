import { NgForOf } from '@angular/common';
import { Directive, Input, NgIterable, inject } from '@angular/core';

@Directive({
	selector: '[ngForTrackByProp]',
	standalone: true,
})
export class TrackByProp<T> {
	@Input() ngForOf!: NgIterable<T>;
	private ngFor = inject(NgForOf<T>, { self: true });

	@Input({ required: true })
	set ngForTrackByProp(trackByProp: keyof T) {
		if (!trackByProp) return;
		this.ngFor.ngForTrackBy = (index: number, item: T) => item[trackByProp];
	}
}
