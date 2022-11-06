import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { authServiceConnection } from 'src/app/services/UserBack.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('FormData') formData: NgForm;

  loginStatus: boolean = true;
  hasError: boolean = null;
  userSubscription: Subscription;
  navigate: boolean = false;

  constructor(
    private userService: UserService,
    private backUser: authServiceConnection,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('login Inid');
  }

  changeMode() {
    this.loginStatus = !this.loginStatus;
  }

  register() {
    this.formData.value.role = 'ALUMNO';
    this.backUser
      .register(this.formData.value)
      .pipe(
        tap((value) => {
          this.changeMode();
          console.log(value);
        }),
        catchError((err) => this.handleError(err))
      )
      .subscribe();
  }

  login() {
    this.userSubscription = this.backUser
      .logIn(this.formData.value)
      .pipe(
        tap((value) => {
          this.userService.setUserLogged(value.existsUser);
          this.router.navigate(['']);
          localStorage.setItem('userID', value.existsUser.id);
          localStorage.setItem('authToken', value.token);
        }),
        catchError((err) => this.handleError(err))
      )
      .subscribe();
  }

  handleError(error) {
    console.log('ERROR', error);
    return of(error);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
