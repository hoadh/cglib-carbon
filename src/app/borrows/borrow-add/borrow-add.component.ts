import { Component, OnInit } from '@angular/core';
import { ProgressIndicator } from 'carbon-components-angular';

@Component({
	selector: 'app-borrow-add',
	templateUrl: './borrow-add.component.html',
	styleUrls: ['./borrow-add.component.scss']
})
export class BorrowAddComponent implements OnInit {
	skeletonSteps = [];
	orientation = 'horizontal';
	steps = [
		{
			text: 'Người mượn',
			state: ['current']
		},
		{
			text: 'Chọn sách',
			state: ['incomplete']
		},
		{
			text: 'Thời hạn',
			state: ['incomplete']
		},
		{
			text: 'Hoàn thành',
			state: ['incomplete']
		},
	];
	current = 0;

	ngOnInit() {
		this.skeletonSteps = ProgressIndicator.skeletonSteps(4);
	}

	previous() {
		this.current--;
	}

	next() {
		this.current++;
	}
}
