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
  UserSubscription: Subject<{ Message: string; userResult?: User }>;
  userData: User;
  loggedIn: boolean = false;
  currentUserID: string;

  constructor(
    private backConnection: authServiceConnection,
    private router: Router
  ) {}

  getUserIDFromJWT(): string {
    const jwtDecoded = jwt_decode<JwtPayload>(
      localStorage.getItem('authToken')
    );
    return jwtDecoded['id'];
  }

  getCurrentUser() {
    return this.userData;
  }

  async loginUser(userData: { email: string; password: string }) {
    try {
      const userLogged = await firstValueFrom(
        this.backConnection.loginUser(userData)
      );
      localStorage.setItem('authToken', userLogged.token);
      console.log('UserLoggedoFirstValueOf', userLogged);
      this.loggedIn = true;
      this.router.navigate(['/home']);
    } catch (error) {
      return error.error.Message;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedInUser(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  getUser() {
    if (!localStorage.getItem('authToken')) this.router.navigate(['/login']);
    console.log('GeUser');
    let hasError: boolean = false;

    this.backConnection.getUser(this.getUserIDFromJWT()).subscribe({
      next(value) {
        this.userData = value.userResult;
      },
      error(error) {
        console.error(error.error.Message);
        hasError = true;
      },
    });
    if (this.userData !== undefined) this.loggedIn = true;
    if (hasError) this.redirectToLogin();
  }

  getUserSubscription() {
    this.loggedIn = true;
    const auxSuscription = this.backConnection.getUser(this.getUserIDFromJWT());
    auxSuscription.subscribe({
      next(value) {
        this.userData = value.userResult;
        //this.currentUser$.emit(this.userData);
        console.log('Suscription on getUserSubscription', this.userData);
      },
      error(err) {
        console.log(err);
      },
    });
    console.log(auxSuscription);
    return auxSuscription;
  }

  getUsersObservable() {
    console.log('USERDATA', this.userData);
    return this.backConnection.getUser(this.getUserIDFromJWT());
  }

  getUserRole() {
    console.log('USERDATAROLE');
    return this.userData.role;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.redirectToLogin();
  }

  registerUser(newUser: User) {
    return this.backConnection.registerUser(newUser);
  }

  editUser(newUserData: User) {
    return this.backConnection.editUser(newUserData, this.getUserIDFromJWT());
  }
}
