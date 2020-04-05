import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

	@ViewChild('actionTemplate', null)
	protected actionTemplate: TemplateRef<any>;

	@ViewChild('statusTemplate', null)
	protected statusTemplate: TemplateRef<any>;

	constructor(
		private modalService: ModalService,
		private notificationService: NotificationService,
		private booksService: BooksService
	) { }

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'Tên sách' }),
			new TableHeaderItem({ data: 'Tác giả' }),
			new TableHeaderItem({ data: 'Danh mục' }),
			new TableHeaderItem({ data: 'Tình trạng' }),
			new TableHeaderItem({ data: ''}),
		];

		const libraryId = localStorage.getItem('LIBRARY_ID');
		this.booksService.getBooksInLibrary(libraryId).subscribe( result => {
			this.handleResponseData(result);
		});
	}

	handleResponseData(response: HttpResult) {
		if (response.status !== 'success') {
			const errorData = [];
			errorData.push([
				new TableItem({ data: 'error!' })
			]);
			this.model.data = errorData;
		} else {
			this.skeleton = false;
			console.log(response);
			this.data = response.data;
			this.model.pageLength = 10;
			this.model.totalDataLength = this.data.length;
			this.selectPage(1);
		}
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

	showNotification(type: string, title: string, message: string) {
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
	}
}
