import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-book-status',
	templateUrl: './book-status.component.html',
	styleUrls: ['./book-status.component.scss']
})
export class BookStatusComponent implements OnInit {
	@Input() status: number;

	constructor() { }

	ngOnInit() { }

}
