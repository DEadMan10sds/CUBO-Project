import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ClassesService } from 'src/app/services/classes.service';
import { storeUserData } from 'src/app/services/storeUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ClassesService]
})
export class HomeComponent implements OnInit {

  actualUserData: UserModel;
  userSuscription: Subscription;

  constructor(private userDataStored: storeUserData) { }

  ngOnInit(): void {
    this.userSuscription = this.userDataStored.userStored.subscribe(
      (resultUserData: UserModel) => {
        this.actualUserData = resultUserData;
      }
    );
    this.actualUserData = this.userDataStored.getUserStored();
    console.log(this.actualUserData)
  }

}
