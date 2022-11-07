import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class authServiceConnection {
  constructor(private httpSolicitudes: HttpClient) {}

  skipSolicitude() {
    return {
      SkipSolicitude: 'yes',
    };
  }

  logIn(userData: { email: string; password: string }) {
    return this.httpSolicitudes.post<{
      Message: string;
      existsUser?: User;
      token?: string;
    }>(environment.backURL + '/auth/login', userData, {
      headers: this.skipSolicitude(),
    });
  }

  register(newUser: User) {
    return this.httpSolicitudes.post<{
      Message: string;
      existsUser?: User;
    }>(environment.backURL + '/users/', newUser, {
      headers: this.skipSolicitude(),
    });
  }

  getUser(userID: string) {
    return this.httpSolicitudes.get<{ Message: string; userResult?: User }>(
      environment.backURL + '/users/' + userID
    );
  }

  editUser(editedUser: User) {
    this.httpSolicitudes
      .put<{ Message: string; editedUser?: User }>(
        environment.backURL + '/users/' + editedUser.id,
        editedUser
      )
      .subscribe();
  }
}
