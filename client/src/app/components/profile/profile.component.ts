import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { storeUserData } from 'src/app/services/storeUser.service';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  actualUser: UserModel;
  actualUserSuscription: Subscription;
  editingUser: boolean = false;
  editErrorTrigger: boolean = false;
  editError;

  constructor(
    private userData: storeUserData,
    private userBack: UserBackConnectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualUserSuscription = this.userData.userStored.subscribe(
      {
        next: (result) => this.actualUser = result
      }
    );
    this.actualUser = this.userData.getUserStored()
    //console.log(this.actualUser);
  }

  editMode()
  {
    this.editingUser = !this.editingUser;
  }

  editUserData(userDataForm: NgForm)
  {
    this.userBack.updateUser(userDataForm.value).subscribe(
      {
        next: (result) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.editErrorTrigger = true
          this.editError = error;
          console.log(error)
        }
      }
    );
  }

}
