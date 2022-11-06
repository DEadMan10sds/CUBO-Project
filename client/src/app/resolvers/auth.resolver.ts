import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { authServiceConnection } from '../services/UserBack.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private userBack: authServiceConnection,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.getUserLogged();
    if (currentUser.name == undefined) {
      this.userBack
        .getUser(localStorage.getItem('userID'))
        .pipe(
          tap((user) => {
            this.userService.setUserLogged(user.userResult);
          })
        )
        .subscribe();
    }
    return currentUser;
  }
}
