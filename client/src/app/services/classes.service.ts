import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ClassesModel } from "../models/classes.model";

export class ClassesService{

  classesChanges = new Subject<ClassesModel[]>();

  private existingClasses: ClassesModel[] = [];

  getExistingClasses()
  {
    //console.log("GET existing classes",this.existingClasses)
    return this.existingClasses.slice();
  }

  getSingleClass(classId: string)
  {
    return this.existingClasses.find(searchedClass => searchedClass.id === classId);
    //return this.existingClasses.find(arrClass => arrClass.id === classId);
  }

  setClasses(classesArray: ClassesModel[])
  {
    //console.log("SettingClasses");
    this.existingClasses = classesArray;
    //console.log("Setted Classess", this.existingClasses)
    //console.log("Get classes after setted: ", this.getExistingClasses())
  }

  existsClass(classIdToSearch: string): boolean
  {
    if(this.existingClasses.find(searchedClass => searchedClass.id === classIdToSearch)) return true;
    return false;
  }

}
