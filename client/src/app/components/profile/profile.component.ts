import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { storeUserData } from 'src/app/services/storeUser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  actualUser: UserModel;
  actualUserSuscription: Subscription;

  constructor(private userData: storeUserData) { }

  ngOnInit(): void {
    this.actualUserSuscription = this.userData.userStored.subscribe(
      {
        next: (result) => this.actualUser = result
      }
    );
    this.actualUser = this.userData.getUserStored()
    //console.log(this.actualUser);
  }

}
