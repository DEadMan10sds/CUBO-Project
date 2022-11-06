import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('FormData') profileForm: NgForm;

  errorsOccurred;
  UserData: User;
  UserSubscription: Subscription;
  UserObservable!: Observable<{ Message: string; userResult?: User }>;
  disabledForm: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //this.userService.getUser();
    /*
    this.userService
      .getUsersObservable()
      .pipe(takeUntil(this.UserSubject))
      .subscribe({
        next(value) {
          console.log('Init Profile');
          this.UserData = value.userResult;
          console.log(this.UserData);
        },
      });
    */
    /*
    this.UserSubscription = this.userService.getUsersObservable().subscribe({
      next(value) {
        this.UserData = value.userResult;
        this.infoLoaded = true;
        console.log(
          'SetUserInProfileWithObservableReturned',
          this.UserData,
          value.userResult
        );
      },
    });
    */
    //this.UserData = this.userService.userData;
    this.UserObservable = this.userService.getUsersObservable();
    //console.log(this.UserObservable);
    //console.log('Profile', this.UserData);
  }

  editForm() {
    this.disabledForm = !this.disabledForm;
  }

  editProfile() {
    this.userService.editUser(this.profileForm.value).subscribe({
      next(value) {},
      error(err) {
        this.errorsOccurred = err;
        console.log(err);
      },
    });
    console.log(this.errorsOccurred);
    this.editForm();
  }

  NgDestroy() {
    this.UserSubscription.unsubscribe();
  }
}
