import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";
import { storeUserData } from "./storeUser.service";

@Injectable({
  providedIn: 'root'
})
export class UserBackConnectionService
{
  currentUser: UserModel;

  constructor(private httpSolicitudes: HttpClient, private router: Router, private userDataStoraged: storeUserData){}

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
      loginData,
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

  logOut()
  {
    localStorage.removeItem('xToken');
    this.router.navigate(['/User/singup']);
  }

  setCurrentUser(user: UserModel)
  {
    this.currentUser = user;
    //console.log(this.currentUser, "Setting current user on service");
  }

  getUserFromService()
  {
    return this.currentUser;
  }

  getUserData(uid: string)
  {
    return this.httpSolicitudes.get<{Message, hasError?, userResult}>(
      (environment.BACK_URL + 'users/' + uid)
    ).pipe(
      tap(
        userDataFetched =>{
          this.userDataStoraged.setUserStored(userDataFetched.userResult);
          this.userDataStoraged.setUserLogged()
        }
      )
    ).toPromise();
  }

  updateUser(userToUpdate: UserModel)
  {
    console.log(userToUpdate);
    return this.httpSolicitudes.put<{Message, editedData}>(
      (environment.BACK_URL + 'users/' + localStorage.getItem('uid')),
      userToUpdate
    )
  }

}
