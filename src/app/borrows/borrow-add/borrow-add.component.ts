import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-borrow-add',
	templateUrl: './borrow-add.component.html',
	styleUrls: ['./borrow-add.component.scss']
})
export class BorrowAddComponent implements OnInit {
	selectedBooks: Book[] = [];

	ngOnInit() {
	}

	setSelectedBooks($event) {
		this.selectedBooks = $event;
	}

}
