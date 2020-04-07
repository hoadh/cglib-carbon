import { Component, ComponentRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
	AlertModalType,
	ModalButtonType,
	ModalService,
	NotificationService,
	Table,
	TableHeaderItem,
	TableItem,
	TableModel,
} from 'carbon-components-angular';
import { BooksService } from '../../_core/services/books.service';
import { CategoriesService } from '../../_core/services/categories.service';
import { HttpResult } from '../../_models/http-result.model';
import { BookModalComponent } from '../../books/book-modal/book-modal.component';
@Component({
	selector: 'app-borrow-table',
	templateUrl: './borrow-table.component.html',
	styleUrls: ['./borrow-table.component.scss']
})
export class BorrowTableComponent implements OnInit {

	model = new TableModel();
	skeletonModel = Table.skeletonModel(10, 5);
	skeleton = true;
	data: BorrowReceipt[] = [];
	categories: Category[] = [];

	@ViewChild('actionTemplate', null) protected actionTemplate: TemplateRef<any>;
	@ViewChild('statusTemplate', null) protected statusTemplate: TemplateRef<any>;
	@ViewChild('expandedTemplate', null) protected expandedTemplate: TemplateRef<any>;

	private modal: ComponentRef<any>;
	private isUpdateReturn = false;

	constructor(
		private modalService: ModalService,
		private notificationService: NotificationService,
		private booksService: BooksService,
		private categoriesService: CategoriesService,
	) { }

	ngOnInit() {
		this.categoriesService.getList().subscribe( result => {
			this.categories = result.data;
		});
		this.model.header = [
			new TableHeaderItem({ data: 'Tên sách' }),
			new TableHeaderItem({ data: 'Người mượn' }),
			new TableHeaderItem({ data: 'Ngày trả (dự kiến)' }),
			new TableHeaderItem({ data: 'Quá hạn' }),
			new TableHeaderItem({ data: ''}),
		];

		this.getBorrowsInLibrary();
	}

	getBorrowsInLibrary() {
		const libraryId = localStorage.getItem('LIBRARY_ID');
		this.booksService.getBorrowingList(libraryId).subscribe( result => {
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

	showErrorTableData() {
		this.skeleton = false;
		const errorData = [];
		errorData.push([
			new TableItem({ data: 'error!' })
		]);
		this.model.data = errorData;
	}

	prepareData(data: BorrowReceipt[]) {
		const newData = [];

		for (const datum of data) {
			newData.push([
				new TableItem({
					data: datum.book.title,
					expandedData: datum, expandedTemplate: this.expandedTemplate
				}),
				new TableItem({ data: datum.full_name }),
				new TableItem({ data: datum.date_expected_returned }),
				new TableItem({ data: { status: datum.book.status_id }, template: this.statusTemplate }),
				new TableItem({ data: datum, template: this.actionTemplate })
			]);
		}
		return newData;
	}

	selectPage(page) {
		const offset = this.model.pageLength * (page - 1);
		const pageRawData = this.data.slice(offset, offset + this.model.pageLength);
		this.model.data = this.prepareData(pageRawData);
		this.model.currentPage = page;
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

	// openEditBookModal(book: Book) {
	// 	this.modal = this.modalService.create({
	// 		component: BookModalComponent,
	// 		inputs: {
	// 			label: '',
	// 			title: 'Chỉnh sửa thông tin',
	// 			book: book,
	// 			categories: this.categories,
	// 			onSave: (res) => {
	// 				const updatedBook = book;
	// 				updatedBook.title = res.title;
	// 				updatedBook.authors = res.authors;
	// 				updatedBook.category_id = res.category_id;
	// 				updatedBook.note = res.note;
	// 				this.editBook(updatedBook.id, updatedBook);
	// 			}
	// 		}
	// 	});
	// }
	//
	// editBook(bookId: number, book: Book) {
	// 	const libraryId = Number(localStorage.getItem('LIBRARY_ID'));
	// 	this.booksService.update(libraryId, bookId, book).subscribe(res => {
	// 		if (res.status === 'success') {
	// 			this.modal.destroy();
	// 			this.showNotification('success', 'Chỉnh sửa',
	// 				'Thông tin sách đã được cập nhật thành công.', false);
	// 			this.getBorrowsInLibrary();
	// 		}
	// 	});
	// }

	showReturnBook(bookId: number, bookTitle: string) {
		const SEPARATOR = '<br><br>';
		this.modalService.show( {
			type: AlertModalType.danger,
			title: 'Cập nhật trả sách sách',
			content: `Thông tin sách "${bookTitle}" sẽ được trả về thư viện?` + SEPARATOR,
			size: 'sm',
			buttons: [
				{
					text: 'Huỷ',
					type: ModalButtonType.secondary,
				},
				{
					text: 'Xoá',
					type: ModalButtonType.primary,
					click: () => {
						this.returnBook(bookId, bookTitle);
					}
				}
			]
		});
	}

	returnBook(borrơwId: number, bookTitle: string) {
		this.isUpdateReturn = true;
		const libraryId = Number(localStorage.getItem('LIBRARY_ID'));
		this.booksService.returnBook(libraryId, borrơwId).subscribe(res => {
			if (res.status === 'success') {
				this.showNotification('info', 'Cập nhật trả sách',
					`Sách "${bookTitle}" đã được cập nhật thông tin vào thư viện.`, false);
				this.getBorrowsInLibrary();
			} else {
				this.showNotification('error', 'Lỗi khi xoá thông tin sách',
					`Sách "${bookTitle}" chưa được cập nhật thông tin. Nguyên nhân: "${res.message}."`, false);
			}
			this.isUpdateReturn = false;
		}, error => {
			this.showNotification('error', 'Lỗi khi xoá thông tin sách',
				`Sách "${bookTitle}" chưa được cập nhật thông tin. Có thể phiên đăng nhập đã hết hạn.' +
				' Vui lòng đăng nhập lại và thử xoá lần nữa.`, false);
			this.isUpdateReturn = false;
		});
	}

}
