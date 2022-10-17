import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { storeUserData } from '../services/storeUser.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userData: storeUserData){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateUser()
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateUser();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  validateUser():boolean
  {
    if(this.userData.getCurrentUserRole() === 'PROFESOR' || this.userData.getCurrentUserRole() === 'ADMIN') return true;
    return false;
  }

}
