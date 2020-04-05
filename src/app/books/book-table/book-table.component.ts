import { Component, ComponentRef, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
	private modal: ComponentRef<any>;

	@ViewChild('actionTemplate', null)
	protected actionTemplate: TemplateRef<any>;

	@ViewChild('statusTemplate', null)
	protected statusTemplate: TemplateRef<any>;

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
			console.log(response);
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
				new TableItem({ data: datum.category.name }),
				new TableItem({ data: { status: datum.status_id }, template: this.statusTemplate }),
				new TableItem({ data: {id: datum.id}, template: this.actionTemplate })
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

	showDeleteModal() {
		const SEPARATOR = '<br><br>';
		this.modalService.show( {
			type: AlertModalType.danger,
			label: 'Thông tin sách',
			title: 'Xoá sách khỏi thư viện',
			content: 'Bạn có muốn xoá thông tin sách này khỏi thư viện?' + SEPARATOR,
			size: 'sm',
			buttons: [
				{
					text: 'Huỷ',
					type: ModalButtonType.secondary
				},
				{
					text: 'Xoá',
					type: ModalButtonType.danger_primary,
					click: () => this.showNotification('info', '', 'Đã xoá sách khỏi thư viện.')
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

	openBookModal() {
		this.modal = this.modalService.create({
			component: BookModalComponent,
			inputs: {
				label: '',
				title: 'Thêm sách mới',
				categories: this.categories,
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
				this.showNotification('success', 'Thêm sách', 'Sách đã được thêm thành công vào thư viện.', false);
				this.getBooksInLibrary();
			}
		});
	}

}
