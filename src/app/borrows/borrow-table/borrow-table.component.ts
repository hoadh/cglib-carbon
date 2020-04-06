import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalService, NotificationService, Table, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { BooksService } from '../../_core/services/books.service';
import { HttpResult } from '../../_models/http-result.model';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-borrow-table',
	templateUrl: './borrow-table.component.html',
	styleUrls: ['./borrow-table.component.scss']
})
export class BorrowTableComponent implements OnInit, OnDestroy {
	@Input() unselectBook: Subject<number> = null;
	@Output() selectBook = new EventEmitter<Book[]>();

	model = new TableModel();
	skeletonModel = Table.skeletonModel(10, 5);
	skeleton = true;
	data: Book[] = [];

	@ViewChild('actionTemplate', null) protected actionTemplate: TemplateRef<any>;
	@ViewChild('statusTemplate', null) protected statusTemplate: TemplateRef<any>;

	constructor(
		private modalService: ModalService,
		private notificationService: NotificationService,
		private booksService: BooksService,
	) { }

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'Tên sách' }),
			new TableHeaderItem({ data: 'Tác giả' }),
			new TableHeaderItem({ data: 'Danh mục' }),
			new TableHeaderItem({ data: 'Tình trạng' }),
			new TableHeaderItem({ data: ''}),
		];
		this.getBooksInLibrary();
		this.observeUnselectedBookFromInput();
	}

	ngOnDestroy(): void {
		this.unselectBook.unsubscribe();
		this.selectBook.unsubscribe();
	}

	observeUnselectedBookFromInput() {
		if (this.unselectBook !== undefined && this.unselectBook !== null) {
			this.unselectBook.asObservable().subscribe( id => {
				for (let i = 0; i < this.data.length; i++) {
					if (this.data[i].id === id) {
						this.data[i].checked = false;
					}
				}
			});
		}
	}

	getBooksInLibrary() {
		const libraryId = localStorage.getItem('LIBRARY_ID');
		this.booksService.getBooksInLibrary(libraryId).subscribe( result => {
			this.handleResponseData(result);
		}, error => {
			this.showNotification('error', 'Lỗi xử lý', 'Không thể lấy thông tin sách.' +
				' Có thể phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại và thử sau.', false);
			this.showErrorTableData();
		});
	}

	handleResponseData(response: HttpResult) {
		if (response.status !== 'success') {
			this.showErrorTableData();
		} else {
			this.skeleton = false;
			this.data = response.data;
			this.model.pageLength = 10;
			this.model.totalDataLength = this.data.length;
			this.selectPage(1);
		}
	}

	showNotification(type: string, title: string, message: string, autoHide: boolean = true) {
		if (autoHide) {
			this.notificationService.showNotification({
				type: type,
				title: title,
				message: message,
				target: '.notification-container',
				duration: 4000,
				smart: true,
				showClose: true,
				lowContrast: true,
			});
		} else {
			this.notificationService.showNotification({
				type: type,
				title: title,
				message: message,
				target: '.notification-container',
				showClose: true,
				lowContrast: true,
			});
		}
	}

	showErrorTableData() {
		this.skeleton = false;
		const errorData = [];
		errorData.push([
			new TableItem({ data: 'error!' })
		]);
		this.model.data = errorData;
	}

	selectPage(page) {
		const offset = this.model.pageLength * (page - 1);
		const pageRawData = this.data.slice(offset, offset + this.model.pageLength);
		this.model.data = this.prepareData(pageRawData);
		this.model.currentPage = page;
	}

	prepareData(data: Book[]) {
		const newData = [];

		for (const datum of data) {
			newData.push([
				new TableItem({ data: datum.title, expandedData: datum.note }),
				new TableItem({ data: datum.authors }),
				new TableItem({ data: datum.category.name }),
				new TableItem({ data: { status: datum.status_id }, template: this.statusTemplate }),
				new TableItem({ data: datum, template: this.actionTemplate })
			]);
		}
		return newData;
	}

	checkBook(selectedBook: Book) {
		selectedBook.checked = true;
		const selectedBooks = this.data.filter( book => book.checked === true);
		this.selectBook.emit(selectedBooks);
	}
}
