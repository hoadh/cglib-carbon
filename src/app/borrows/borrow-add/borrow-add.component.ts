import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BooksService } from '../../_core/services/books.service';
import { CustomersService } from '../../_core/services/customers.service';
import { NotificationService } from 'carbon-components-angular';

@Component({
	selector: 'app-borrow-add',
	templateUrl: './borrow-add.component.html',
	styleUrls: ['./borrow-add.component.scss']
})
export class BorrowAddComponent implements OnInit {
	selectedBooks: Book[] = [];
	unselectedBook = new Subject<number>();
	dateFormat = 'Y-m-d';
	borrowForm: FormGroup;
	isProcessing = false;

	constructor(
		private booksService: BooksService,
		private customersService: CustomersService,
		private notificationService: NotificationService) {
		this.borrowForm = new FormGroup({
			full_name: new FormControl(''),
			department: new FormControl(''),
			date_expected_returned: new FormControl('')
		});
	}

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

	doSave() {
		this.isProcessing = true;
		const libraryId = localStorage.getItem('LIBRARY_ID');
		// step 1 - create new customer then get customer_id
		const { full_name, department } = this.borrowForm.value;
		/*this.customersService.add(libraryId, {full_name, department} )
			.subscribe(res => {
				// const customerId = res.data.id;
				//
				// // step 2 - get borrow receipt
				// const dateExpectedReturned = this.borrowForm.controls.date_expected_returned.value;
				// const borrowReceipt: BorrowReceipt = {
				// 	customer_id: customerId,
				// 	date_expected_returned: dateExpectedReturned
				// };

				const borrowReceipt: BorrowReceipt = this.borrowForm.value;

				// make request
				this.booksService.borrowBook(libraryId, this.selectedBooks, borrowReceipt)
					.subscribe( borrowBookRes => {
						if (borrowBookRes.status === 'success') {
							this.showNotification('succes', 'Thêm phiếu mượn', 'Đã tạo phiếu mượn thành công. Bạn có thể xem lại tại đây: ...');
						} else {
							this.showNotification('error', 'Lỗi thêm phiếu mượn', 'Nguyên nhân: ' + borrowBookRes.message);
						}
						this.isProcessing = false;
					}, error => { // this.booksService.borrowBook
						this.isProcessing = false;
						this.showNotification('error', '', 'Lỗi xử lý. Vui lòng đăng nhập lại và thử sau.', false);
					});
			}, err => { // this.customersService.add
				this.isProcessing = false;
				this.showNotification('error', '', 'Có thể phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại và thử sau.', false);
			});*/
		const borrowReceipt: BorrowReceipt = this.borrowForm.value;
		borrowReceipt.date_expected_returned = this.getLocalDate(new Date(this.borrowForm.controls.date_expected_returned.value[0]));

		// make request
		this.booksService.borrowBook(libraryId, this.selectedBooks, borrowReceipt)
			.subscribe( borrowBookRes => {
				if (borrowBookRes.status === 'success') {
					this.showNotification(
						'succes',
						'Thêm phiếu mượn',
						'Đã tạo phiếu mượn thành công. Bạn có thể xem lại tại đây: ...');
					this.borrowForm.reset();
					this.selectedBooks = [];
				} else {
					this.showNotification(
						'error',
						'Lỗi thêm phiếu mượn',
						'Nguyên nhân: ' + borrowBookRes.message);
				}
				this.isProcessing = false;
			}, error => { // this.booksService.borrowBook
				this.isProcessing = false;
				this.showNotification('error', '', 'Lỗi xử lý. Vui lòng đăng nhập lại và thử sau.', false);
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

	getLocalDate(dateInput: Date) {
		const nDate = dateInput.toLocaleString('en-US', {
			timeZone: 'Asia/Ho_Chi_Minh'
		});
		const date = nDate.split(',')[0].split('/');
		return `${date[2]}-${date[0]}-${date[1]}`;
	}


}
