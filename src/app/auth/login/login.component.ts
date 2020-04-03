import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
	}

}
