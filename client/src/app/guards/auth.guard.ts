import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanDeactivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserBackConnectionService } from '../services/userBackConnection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userConnection: UserBackConnectionService,
    private router: Router
  ){}

  canActivate():boolean {
    if(this.userConnection.isLoggedIn()) return true;

    this.router.navigate(['/User/signup']);
    return false;
  }

}
