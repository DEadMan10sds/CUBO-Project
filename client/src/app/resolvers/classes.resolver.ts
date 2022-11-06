import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ClassInterface } from '../interfaces/classes.interface';
import { ClassesService } from '../services/classes.service';
import { ClassesBackService } from '../services/classesBack.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverClass implements Resolve<ClassInterface[]> {
  constructor(
    private classService: ClassesService,
    private backService: ClassesBackService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | ClassInterface[]
    | Observable<ClassInterface[]>
    | Promise<ClassInterface[]> {
    const classsesInstance = this.classService.getClassesArray();
    if (classsesInstance.length === 0)
      return this.backService.fetchClasses(localStorage.getItem('currentLab'));
    return classsesInstance;
  }
}
