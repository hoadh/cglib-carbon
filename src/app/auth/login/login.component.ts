import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
	oldColor: string;

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.oldColor = this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor;
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
	}

	ngOnDestroy(): void {
		// reset body background-color
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.oldColor;
	}
}
