import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver
  implements Resolve<Observable<{ Message: string; userResult?: User }>>
{
  constructor(private userService: UserService) {}

  resolve() {
    console.log('Resolver obteniendo suscripción del usuario');
    return this.userService.getUserSubscription();
  }
}
