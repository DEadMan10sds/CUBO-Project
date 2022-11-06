import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  loginUser(userData: { email: string; password: string }) {
    return this.httpSolicitudes.post<{
      Message: string;
      existsUser: User;
      token: string;
    }>(environment.backURL + '/auth/login', userData, {
      headers: this.skipSolicitude(),
    });
  }

  getUser(idUser: string) {
    return this.httpSolicitudes.get<{ Message: string; userResult?: User }>(
      environment.backURL + '/users/' + idUser
    );
  }

  registerUser(newUser: User) {
    newUser.role = 'ALUMNO';
    return this.httpSolicitudes.post<{ Message: string; insert?: User }>(
      environment.backURL + '/users/',
      newUser,
      {
        headers: this.skipSolicitude(),
      }
    );
  }

  editUser(newData: User, userID: string) {
    return this.httpSolicitudes.put<{ Message: string; editedUser?: User }>(
      environment.backURL + '/users/' + userID,
      newData
    );
  }
}
