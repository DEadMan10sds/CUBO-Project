import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataUser: User;
  userSubscription: Subscription;
  currentUser: User;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.dataUser = this.activatedRoute.snapshot.data[0].userResult;
  }

  ngOnInit(): void {
    /*this.userStatus.currentUser$.subscribe((data) => {
      this.dataUser = data;
    });*/
    //this.currentUser = this.userStatus.getCurrentUser();
    /*this.userSubscription = this.activatedRoute.snapshot.data[0].subscribe({
      next(value) {
        this.currentUser = value.userResult;
      },
      error(err) {
        console.log(err);
      },
    });*/
    console.log(
      'GetUserFromActivatedRouteSnapshot',
      this.activatedRoute.snapshot.data[0].userResult
    );
    console.log('InitHomeComponent', this.dataUser);
    this.userService.setLoggedInUser(true);
  }

  ngOnDestroy() {
    console.log('Home destroy');
  }
}
