import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ClassesModel } from "../models/classes.model";

export class ClassesService{

  classesChanges = new Subject<ClassesModel[]>();

  private existingClasses: ClassesModel[] = [];

  getExistingClasses()
  {
    console.log("GET existing classes",this.existingClasses)
    return this.existingClasses.slice();
  }

  getSingleClass(classId: string)
  {
    console.log("Existing cLASSES", this.existingClasses);
    return this.existingClasses.find(
      searchedClass => {
        console.log("SEARCHED CLASS", classId)
        searchedClass.id === classId;
        console.log("Service clas id: ", classId)
      }
    );
  }

  setClasses(classesArray: ClassesModel[])
  {
    console.log("SettingClasses");
    this.existingClasses = classesArray;
    console.log("Setted Classess", this.existingClasses)
    console.log("Get classes after setted: ", this.getExistingClasses())
  }
}
