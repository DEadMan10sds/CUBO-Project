import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserModel } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class storeUserData {
  private currentUserStored: UserModel;
  userStored = new Subject<UserModel>();
  isLogged: boolean = false;

  getUserStored()
  {
    return this.currentUserStored;
  }

  setUserStored(newUser: UserModel)
  {
    this.currentUserStored = newUser;
    this.userStored.next(this.currentUserStored);
  }

  getCurrentUserRole()
  {
    return this.currentUserStored.role;
  }

}
