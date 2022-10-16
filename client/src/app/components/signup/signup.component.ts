import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  //show hide div variables
  userlogin = false;
  userregister = true;
  //Buttons clicks functionalities

  currentUser: UserModel;
  loginError;
  loginHadError: boolean = false;

  @ViewChild('registerUser', {static: false}) registerForm: NgForm;

  constructor(
    private userBack: UserBackConnectionService,
    private router: Router
  ){}

  ngOnInit()
  {
  }

  user_register()
  {
    this.userlogin = false;
    this.userregister = true;
  }
  user_login()
  {
    this.userlogin = true;
    this.userregister = false;
  }

  register(userData: NgForm)
  {
    console.log(userData.value);
    const {repeatPassword, ...newUser} = userData.value;
    newUser.role = "ALUMNO";
    this.userBack.registerUser(newUser).subscribe(
      (received: {Message, insert: UserModel})=>
      {
        console.log(received);
        this.user_login()
      },
      (error)=> {
        console.log(error);
      }
    );;
  }

  login(loginData: NgForm)
  {
    console.log("Login data", loginData.value);
    this.userBack.loginUser(loginData.value).subscribe(
      (receiver: {Message: string, existsUser: UserModel, token: string}) => {
        console.log(receiver);
        this.currentUser = receiver.existsUser;
        console.log("Loggueado", this.currentUser);
        localStorage.setItem("xToken", receiver.token)
        this.router.navigate(['/']);
      },
      (error) => {
        this.loginError = error;
        this.loginHadError = true;
      }
    );
  }

}
