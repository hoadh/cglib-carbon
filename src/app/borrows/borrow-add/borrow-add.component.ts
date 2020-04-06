import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-borrow-add',
	templateUrl: './borrow-add.component.html',
	styleUrls: ['./borrow-add.component.scss']
})
export class BorrowAddComponent implements OnInit {
	selectedBooks: Book[] = [];
	unselectedBook = new Subject<number>();

	ngOnInit() {
	}

	setSelectedBooks($event) {
		this.selectedBooks = $event;
	}

	unselectBook(index: number) {
		const id = this.selectedBooks[index].id;
		this.unselectedBook.next(id);
		this.selectedBooks.splice(index, 1);
	}
}
