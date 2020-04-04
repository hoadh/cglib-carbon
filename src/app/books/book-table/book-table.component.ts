import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
	TableModel,
	TableItem,
	TableHeaderItem,
	Table,
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

	@ViewChild('linkTemplate', null)
	protected linkTemplate: TemplateRef<any>;

	constructor() {
	}

	ngOnInit() {
		this.model.data = [
			[
				new TableItem({ data: 'Đổi mới sáng tạo', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: 'Trên kệ' }),
				new TableItem({ data: {id: 1}, template: this.linkTemplate }),
			],
			[
				new TableItem({ data: 'Lãnh đạo', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: 'Trên kệ' }),
				new TableItem({ data: {id: 2}, template: this.linkTemplate }),
			],
			[
				new TableItem({ data: 'Marketing chiến lược', expandedData: 'Row description' }),
				new TableItem({ data: 'Harvard Business Review' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: 'Trên kệ' }),
				new TableItem({ data: {id: 3}, template: this.linkTemplate }),
			],
			[
				new TableItem({ data: 'Mở rộng doanh nghiệp', expandedData: 'Row description' }),
				new TableItem({ data: 'Verne Harnish' }),
				new TableItem({ data: 'Quản trị, doanh nghiệp' }),
				new TableItem({ data: 'Trên kệ' }),
				new TableItem({ data: {id: 4}, template: this.linkTemplate }),
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


	prepareData(data) {
		const newData = [];

		for (const datum of data) {
			newData.push([
				new TableItem({ data: datum.name, expandedData: datum.description }),
				new TableItem({ data: new Date(datum.createdAt).toLocaleDateString() }),
				new TableItem({ data: new Date(datum.updatedAt).toLocaleDateString() }),
				new TableItem({ data: datum.issues.totalCount }),
				new TableItem({ data: datum.stargazers.totalCount }),
				new TableItem({
					data: {
						id: datum.id,
					},
					template: this.linkTemplate
				})
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
}
