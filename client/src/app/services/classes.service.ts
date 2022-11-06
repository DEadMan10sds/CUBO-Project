import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClassInterface } from '../interfaces/classes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  classArrayChanges = new Subject<ClassInterface[]>();
  private classesArray: ClassInterface[] = [];

  setClassesArray(newClassesArray: ClassInterface[]) {
    console.log('SETTING CLASSES');
    this.classesArray = newClassesArray;
    this.classArrayChanges.next(this.classesArray.slice());
  }

  getClassesArray(): ClassInterface[] {
    console.log('GetClasses', this.classesArray);
    return this.classesArray.slice();
  }

  setEmptyClassesArray() {
    console.log('VACIANDO ARREGLO DE CLASES');
    this.classesArray = [];
    this.classArrayChanges.next(this.classesArray.slice());
  }

  getSpecificClassByID(classIDSearched: string) {
    return this.classesArray.find(
      (selectClass) => selectClass.id === classIDSearched
    );
  }
}
