import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
import { storeUserData } from "../storeUser.service";
import { UserBackConnectionService } from "../userBackConnection.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserModel>
{

  uData: UserModel;

  constructor(private userBack: UserBackConnectionService, private dataStored: storeUserData){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const uid = localStorage.getItem('uid');
    const uDataStored = this.dataStored.getUserStored();
    console.log(uDataStored)
    if(uDataStored === undefined)
    {
      console.log("resolver", uid)
      this.userBack.getUserData(uid).subscribe(
      (result: {Message, hasError?, userResult})=> {
        this.uData = result.userResult;
        console.log(this.uData, "Resolver Data")
        this.userBack.currentUser = this.uData;
      }
    );
    return this.uData;
    }
    return uDataStored
  }
}
