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
import { HttpResult } from '../../_models/http-result.model';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { CategoriesService } from '../../_core/services/categories.service';
import { BookImportModalComponent } from '../book-import-modal/book-import-modal.component';
import { Book } from '../../_models/entities/book';
import { Category } from '../../_models/entities/category';

@Component({
	selector: 'app-book-table',
	templateUrl: './book-table.component.html',
	styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
	model = new TableModel();
	skeletonModel = Table.skeletonModel(10, 5);
	skeleton = true;
	data: Book[] = [];
	categories: Category[] = [];
	isDeletingBook = false;

	@ViewChild('actionTemplate', null) protected actionTemplate: TemplateRef<any>;
	@ViewChild('statusTemplate', null) protected statusTemplate: TemplateRef<any>;

	private modal: ComponentRef<any>;

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
			new TableHeaderItem({ data: 'Tác giả' }),
			new TableHeaderItem({ data: 'Danh mục' }),
			new TableHeaderItem({ data: 'Tình trạng' }),
			new TableHeaderItem({ data: ''}),
		];

		this.getBooksInLibrary();
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

	showErrorTableData() {
		this.skeleton = false;
		const errorData = [];
		errorData.push([
			new TableItem({ data: 'error!' })
		]);
		this.model.data = errorData;
	}

	prepareData(data: Book[]) {
		const newData = [];

		for (const datum of data) {
			newData.push([
				new TableItem({ data: datum.title, expandedData: datum.note }),
				new TableItem({ data: datum.authors }),
				(datum.category)
					? new TableItem({ data: datum.category.name })
					: new TableItem({data: ''}),
				new TableItem({ data: { status: datum.status_id }, template: this.statusTemplate }),
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

	showDeleteModal(bookId: number, bookTitle: string) {
		const SEPARATOR = '<br><br>';
		this.modalService.show( {
			type: AlertModalType.danger,
			label: 'Thông tin sách',
			title: 'Xoá thông tin sách',
			content: `Bạn có muốn xoá thông tin sách "${bookTitle}" khỏi thư viện?` + SEPARATOR,
			size: 'sm',
			buttons: [
				{
					text: 'Huỷ',
					type: ModalButtonType.secondary,
				},
				{
					text: 'Xoá',
					type: ModalButtonType.danger_primary,
					click: () => {
						this.deleteBook(bookId, bookTitle);
					}
				}
			]
		});
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

	openNewBookModal() {
		this.modal = this.modalService.create({
			component: BookModalComponent,
			inputs: {
				label: '',
				title: 'Thêm sách mới',
				book: undefined,
				categories: this.categories,
				secondaryLabel: 'Nhập sách từ Excel',
				doSecondary: () => this.openImportBooksModal(),
				onSave: (book) => this.addBook(book)
			}
		});
	}

	addBook(book: Book) {
		book.status_id = 1;
		book.library_id = Number(localStorage.getItem('LIBRARY_ID'));
		this.booksService.add(book).subscribe(res => {
			if (res.status === 'success') {
				this.modal.destroy();
				this.showNotification('success', 'Thêm sách',
					'Sách đã được thêm thành công vào thư viện.', false);
				this.getBooksInLibrary();
			}
		});
	}

	openImportBooksModal() {
		this.modal = this.modalService.create({
			component: BookImportModalComponent,
			inputs: {
				onSave: (file: File) => this.importFile(file)
			}
		});
	}

	importFile(file: File) {
		const myFormData = new FormData();
		myFormData.append('file', file);
		const libraryId = Number(localStorage.getItem('LIBRARY_ID'));
		this.booksService.importBooks(libraryId, myFormData).subscribe( result => {
			const status = result.status;
			if (status === 'success') {
				this.modal.destroy();
				this.showNotification('info', 'Nhập sách',
					`Sách từ file ${file.name} đã được đưa vào thư viện.`, false);
				this.getBooksInLibrary();
			} else {
				this.showNotification('error', 'Lỗi nhập sách',
					`Sách từ file ${file.name} chưa được đưa vào thư viện. Nguyên nhân: "${result.message}."`, false);
			}
		}, error => {
			this.showNotification('error', 'Lỗi nhập sách',
				`Sách từ file ${file.name} chưa được đưa vào thư viện. Có thể phiên đăng nhập đã hết hạn.' +
				' Vui lòng đăng nhập lại và thử xoá lần nữa.`, false);
		});
	}

	openEditBookModal(book: Book) {
		this.modal = this.modalService.create({
			component: BookModalComponent,
			inputs: {
				label: '',
				title: 'Chỉnh sửa thông tin',
				book: book,
				categories: this.categories,
				secondaryLabel: 'Huỷ',
				doSecondary: () => {},
				onSave: (res) => {
					const updatedBook = book;
					updatedBook.title = res.title;
					updatedBook.authors = res.authors;
					updatedBook.category_id = res.category_id;
					updatedBook.note = res.note;
					this.editBook(updatedBook.id, updatedBook);
				}
			}
		});
	}

	editBook(bookId: number, book: Book) {
		const libraryId = Number(localStorage.getItem('LIBRARY_ID'));
		this.booksService.update(libraryId, bookId, book).subscribe(res => {
			if (res.status === 'success') {
				this.modal.destroy();
				this.showNotification('success', 'Chỉnh sửa',
					'Thông tin sách đã được cập nhật thành công.', false);
				this.getBooksInLibrary();
			}
		});
	}

	deleteBook(bookId: number, bookTitle: string) {
		this.isDeletingBook = true;
		const libraryId = Number(localStorage.getItem('LIBRARY_ID'));
		this.booksService.delete(libraryId, bookId).subscribe(res => {
			if (res.status === 'success') {
				this.showNotification('info', 'Xoá thông tin sách',
					`Sách "${bookTitle}" đã được xoá khỏi thư viện.`, false);
				this.getBooksInLibrary();
			} else {
				this.showNotification('error', 'Lỗi khi xoá thông tin sách',
					`Sách "${bookTitle}" chưa được xoá khỏi thư viện. Nguyên nhân: "${res.message}."`, false);
			}
			this.isDeletingBook = false;
		}, error => {
			this.showNotification('error', 'Lỗi khi xoá thông tin sách',
				`Sách "${bookTitle}" chưa được xoá khỏi thư viện. Có thể phiên đăng nhập đã hết hạn.' +
				' Vui lòng đăng nhập lại và thử xoá lần nữa.`, false);
			this.isDeletingBook = false;
		});
	}

}
