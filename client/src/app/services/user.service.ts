import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { authServiceConnection } from './UserBack.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { firstValueFrom, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UserChanges = new Subject<User>();
  private UserLogged: User = new User();

  constructor(private router: Router) {}

  setUserLogged(loggedUser: User) {
    this.UserLogged = loggedUser;
    this.UserChanges.next(this.UserLogged);
  }

  getUserLogged() {
    console.log(this.UserLogged);
    return this.UserLogged;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.redirectToLogin();
  }
}
