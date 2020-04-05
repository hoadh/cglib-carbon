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

@Component({
	selector: 'app-book-table',
	templateUrl: './book-table.component.html',
	styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
	model = new TableModel();
	skeletonModel = Table.skeletonModel(10, 5);
	skeleton = false;
	data = [];

	@ViewChild('actionTemplate', null)
	protected actionTemplate: TemplateRef<any>;

	@ViewChild('statusTemplate', null)
	protected statusTemplate: TemplateRef<any>;

	constructor(private modalService: ModalService, private notificationService: NotificationService) {
	}

	ngOnInit() {
		this.model.data = [
			[
				new TableItem({ data: 'Đổi mới sáng tạo', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: { status: 1 }, template: this.statusTemplate }),
				new TableItem({ data: {id: 1}, template: this.actionTemplate }),
			],
			[
				new TableItem({ data: 'Lãnh đạo', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: { status: 1 }, template: this.statusTemplate }),
				new TableItem({ data: {id: 2}, template: this.actionTemplate }),
			],
			[
				new TableItem({ data: 'Marketing chiến lược', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: { status: 3 }, template: this.statusTemplate }),
				new TableItem({ data: {id: 3}, template: this.actionTemplate }),
			],
			[
				new TableItem({ data: 'Mở rộng doanh nghiệp', expandedData: 'Row description' }),
				new TableItem({ data: 'Verne Harnish' }),
				new TableItem({ data: 'Marketing' }),
				new TableItem({ data: { status: 2 }, template: this.statusTemplate }),
				new TableItem({ data: {id: 4}, template: this.actionTemplate }),
			],
			[
				new TableItem({ data: 'Chiến lược đại dương xanh', expandedData: 'Row description' }),
				new TableItem({ data: 'W. Chan Kim& Renee Mauborgne' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: { status: 4 }, template: this.statusTemplate }),
				new TableItem({ data: {id: 4}, template: this.actionTemplate }),
			],
		];
		this.model.header = [
			new TableHeaderItem({ data: 'Tên sách' }),
			new TableHeaderItem({ data: 'Tác giả' }),
			new TableHeaderItem({ data: 'Danh mục' }),
			new TableHeaderItem({ data: 'Tình trạng' }),
			new TableHeaderItem({ data: ''}),
		];
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
