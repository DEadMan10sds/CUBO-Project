import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassesModel } from '../../models/classes.model';
import { BackConnectionService } from '../backConnection.service';
import { ClassesService } from '../classes.service';

@Injectable({
  providedIn: 'root'
})
export class ClassResolverService implements Resolve<ClassesModel[]>
{
  constructor(
    private backConnection: BackConnectionService,
    private classService: ClassesService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClassesModel[] | Observable<ClassesModel[]> | Promise<ClassesModel[]> {
    const classArray: ClassesModel[] = this.classService.getExistingClasses();
    console.log("RESOLVER:", route.params['labName'])
    if(classArray.length === 0) return this.backConnection.fetchClasses(route.params['labName']);
    return classArray;
  }

}
