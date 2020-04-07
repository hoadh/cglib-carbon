interface BorrowReceipt {
	id?: number;
	// customer_id?: number;
	// customer?: Customer;
	full_name: string;
	department: string;
	book_id?: number;
	books?: Book[];
	date_borrowed?: any;
	date_expected_returned?: any;
}
