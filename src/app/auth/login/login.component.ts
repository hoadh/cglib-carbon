import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LOGIN_STATE } from './login-state.enum';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, Notification } from 'carbon-components-angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [AuthService]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
	oldColor: string;
	currentState: LOGIN_STATE = LOGIN_STATE.DEFAULT;
	userForm = new FormGroup({
		username: new FormControl(),
		password: new FormControl(),
	});

	showedNotification: Notification;

	constructor(
		private elementRef: ElementRef,
		private auth: AuthService,
		private router: Router,
		private notificationService: NotificationService) {}

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

	doSignin() {
		this.currentState = LOGIN_STATE.DOING;
		const {username, password} = this.userForm.value;
		this.requestSignin(username, password);
	}

	requestSignin(username, password) {
		this.auth.login(username, password).subscribe(success => {
			if (success) {
				this.currentState = LOGIN_STATE.SUCCESS;
				this.auth.getProfile().subscribe(profile => {
					localStorage.setItem('USER_ROLE', profile.role);
					localStorage.setItem('LIBRARY_ID', profile.library_id);
					this.router.navigate(['/']).then(r => console.log('redirect to /'));

					// TODO: using these code when need role-based features
					// const isAdmin = (profile.role === '1');
					// if (isAdmin) {
					// 	this.router.navigate(['/admin']);
					// } else {
					// 	this.router.navigate(['/lib']);
					// }
				});
			} else {
				this.currentState = LOGIN_STATE.FAILED;
			}
		}, (error) => {
			this.currentState = LOGIN_STATE.ERROR;
			this.handleRequestError(error);

		});
	}

	handleRequestError(error: any) {
		console.log('LOGIN_STATE.ERROR', error);
		if (error instanceof HttpErrorResponse) {
			if (error.status === 0) {
				this.showNotification('error', 'Lỗi đăng nhập', 'Lỗi chưa xác định. Bạn vui lòng refresh trang web và thử đăng nhập lại.');
			} else if (error.status === 401) {
				this.showNotification('error', 'Lỗi đăng nhập', 'Thông tin đăng nhập không chính xác.');
			}
		}
	}

	showNotification(type: string, title: string, message: string) {
		this.closeCurrentNotification();
		this.showedNotification = this.notificationService.showNotification({
			type: type,
			title: title,
			message: message,
			target: '.notification-container',
			showClose: true,
			lowContrast: true,
		});
	}

	closeCurrentNotification() {
		if (this.showedNotification !== undefined) {
			this.notificationService.close(this.showedNotification);
		}
	}
}
