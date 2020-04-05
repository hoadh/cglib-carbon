import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LOGIN_STATE } from './login-state.enum';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

	constructor(private elementRef: ElementRef, private auth: AuthService, private router: Router) { }

	ngOnInit() { }

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
		const { username, password } = this.userForm.value;
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
			console.log('LOGIN_STATE.ERROR', error);
		});
	}
}
