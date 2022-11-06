import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClassInterface } from '../interfaces/classes.interface';
import { Laboratories } from '../interfaces/laboratories.interface';
import { ClassesService } from './classes.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesBackService {
  constructor(
    private httpSolicitudes: HttpClient,
    private classesService: ClassesService
  ) {}

  fetchClasses(labID: string) {
    return this.httpSolicitudes
      .get<ClassInterface[]>(environment.backURL + '/classes/ByLab/' + labID)
      .pipe(
        map((classArray) => {
          return classArray.sort((a, b) => a.hour - b.hour);
        }),
        tap((classArray) => {
          this.classesService.setClassesArray(classArray);
        })
      );
  }

  createClassOnLab(labID: string, newClass: ClassInterface) {
    this.httpSolicitudes
      .post<{
        Message: string;
        newClass?: ClassInterface;
        existsLab?: Laboratories;
      }>(environment.backURL + '/labs/addAndCreateClass/' + labID, newClass)
      .subscribe({
        next(value) {},
        error(err) {
          console.log(err);
        },
      });
  }

  editClass(classID: string, editedClass: ClassInterface) {
    this.httpSolicitudes
      .put<{ Message: string; result: ClassInterface }>(
        environment.backURL + '/classes/edit/' + classID,
        editedClass
      )
      .subscribe();
  }

  deleteClass(labID: string, classID: string, bodyHour) {
    this.httpSolicitudes
      .delete(
        environment.backURL +
          '/labs/deleteClassAndRemove/' +
          labID +
          '/' +
          classID,
        bodyHour
      )
      .subscribe();
  }
}
