import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ClassesModel } from "../models/classes.model";
import { ClassesService } from "./classes.service";

@Injectable({
  providedIn: 'root'
})
export class ClassBackConnection
{

  @Output() hasLabError = new EventEmitter<boolean>()

  constructor(
    private httpSolicitudes: HttpClient,
    private classesService: ClassesService
  ){}

  fetchClasses(lab: string)
  {
    return this.httpSolicitudes.get<ClassesModel[]>(environment.BACK_URL + 'classes/ByLab/' + lab)
    .pipe(
      tap(
        classes => {
          //console.log('FETCHING CLASSES BY LAB', lab ,classes)
          classes.sort( (classA, classB) => classA.hour - classB.hour);
          this.classesService.setClasses(classes);
        }
      )
    );
  }

  createNewClass(newClass: ClassesModel)
  {
    let result;
    //console.log("Creating class: ", newClass);
    this.httpSolicitudes.post<{Message, result: ClassesModel}>(
      (environment.BACK_URL + 'classes/ByLab/'),
      newClass
    ).subscribe(
      resultingClass => {
        this.fetchClasses(resultingClass.result.place);
      },
      (error) => {
        //console.log(error);
        this.classesService.newError(error);
        result =  error;
      }
    );
    return result;
  }

  updateClass(classUpdated: ClassesModel, oldHour: number)
  {
    this.httpSolicitudes.put<{Message, result}>(
      (environment.BACK_URL + 'classes/edit/' + classUpdated.id),
      classUpdated,
    ).subscribe();
    this.httpSolicitudes.post<{Message}>(
      (environment.BACK_URL + 'labs/changeHour/' + classUpdated.place),
      {
        oldHour,
        newHour: classUpdated.hour
      }
    ).subscribe()
  }

  changeLabOfClass(classUpdated: ClassesModel, previousLabID: string)
  {
    this.httpSolicitudes.put<{Message, result}>(
      (environment.BACK_URL + 'classes/edit/' + classUpdated.id),
      classUpdated,
    ).subscribe();

    this.httpSolicitudes.post<{Message}>(
      (environment.BACK_URL + 'labs/deleteClassFromLab/' + previousLabID),
      classUpdated
    ).subscribe();

    this.httpSolicitudes.post<{Message}>(
      (environment.BACK_URL + 'labs/addClassToLab/' + classUpdated.place),
      classUpdated
    ).subscribe();
  }

  deleteClass(classToDelete: string, labID: string , hourToDelete: number)
  {
    this.httpSolicitudes.post<{Message}>(
      (environment.BACK_URL + 'labs/deleteClassFromLab/' + labID),
      {
        id: classToDelete,
        hour: hourToDelete
      }
    ).subscribe();

    this.httpSolicitudes.delete<{Message}>(
      (environment.BACK_URL + 'classes/delete/' + classToDelete)
    ).subscribe();
  }

}
