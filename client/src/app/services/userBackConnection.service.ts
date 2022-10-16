import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserBackConnectionService
{
  currentUser: UserModel;

  constructor(private httpSolicitudes: HttpClient){}

  registerUser(newUser: UserModel)
  {
    this.httpSolicitudes.post<{Message, insert: UserModel}>(
      (environment.BACK_URL + 'users/'),
      newUser,
    ).subscribe(
      (received: {Message, insert: UserModel})=>
      {
        console.log(received);
      },
      (error)=> {
        console.log(error);
      }
    );
  }


  loginUser(loginData: {email: string, password: string})
  {
    this.httpSolicitudes.post<{Message: string, existsUser: UserModel, token: string}>(
      (environment.BACK_URL + 'auth/login/'),
      loginData
    ).subscribe(
      (receiver: {Message: string, existsUser: UserModel, token: string}) => {
        console.log(receiver);
        this.currentUser = receiver.existsUser;
        console.log("Loggueado", this.currentUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
