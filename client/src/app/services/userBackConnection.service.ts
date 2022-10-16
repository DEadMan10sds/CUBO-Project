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
        this.currentUser = received.insert;
        console.log(this.currentUser);
      },
      (error)=> {
        console.log(error);
      }
    );
  }
}
