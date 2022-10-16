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
    return this.httpSolicitudes.post<{Message, insert: UserModel}>(
      (environment.BACK_URL + 'users/'),
      newUser,
    )
  }


  loginUser(loginData: {email: string, password: string})
  {
    return this.httpSolicitudes.post<{Message: string, existsUser: UserModel, token: string}>(
      (environment.BACK_URL + 'auth/login/'),
      loginData
    )
  }

  getToken(): string
  {
    return localStorage.getItem('xToken');
  }


  isLoggedIn(): boolean
  {
    return localStorage.getItem('xToken') ? true : false;
  }

}
