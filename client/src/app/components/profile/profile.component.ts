import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('FormData') profileForm: NgForm;

  UserData: User;
  UserSubscription: Subscription;
  disabledForm: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.UserSubscription = this.userService.UserChanges.pipe(
      tap((user) => {
        this.UserData = user;
      })
    ).subscribe();
    this.UserData = this.userService.getUserLogged();
  }

  editForm() {
    this.disabledForm = !this.disabledForm;
  }

  editProfile() {
    console.log(this.profileForm.value);
  }

  ngOnDestroy() {
    this.UserSubscription.unsubscribe();
  }
}
