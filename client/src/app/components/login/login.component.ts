import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { authServiceConnection } from 'src/app/services/UserBack.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('FormData') formData: NgForm;

  loginStatus: boolean = true;
  registerSubscription: Subscription;
  errorOnAction;
  hasError: boolean = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log("login Inid")
  }

  changeMode() {
    this.loginStatus = !this.loginStatus;
  }

  register() {
    this.registerSubscription = this.userService
      .registerUser(this.formData.value)
      .subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
    this.changeMode();
  }

  login() {
    let errror = this.userService.loginUser(this.formData.value);
    errror
      .then((value) => {
        if (value) {
          this.errorOnAction = value;
          this.hasError = true;
        }
        //console.log(value, this.hasError);
      })
      .catch();
  }

  /**
   * login() {
    this.loginSubscription = this.userService
      .loginUser(this.formData.value)
      .subscribe({
        next(value) {
          console.log(value);
          localStorage.setItem('authToken', value.token);
          this.logginSuccesful = true;
        },
        error(err) {
          console.log(err);
        },
      });
    console.log('ExitLoginSub');
    if (this.logginSuccesful) {
      console.log('SetLogginSettings');
      this.setLogginSettings();
    }
  }

  setLogginSettings() {
    this.userService.setLoggedInUser(true);
    this.router.navigate(['/home']);
  }

  NgDestroy() {
    this.registerSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }
   */
}
