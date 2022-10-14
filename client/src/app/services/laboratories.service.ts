import { LaboratoriesModel } from "../models/laboratories.model";
import {Subject} from "rxjs";
import { BackConnectionService } from "./backConnection.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService{

  laboratoriesChanges = new Subject<LaboratoriesModel[]>()

  private existingLaboratories: LaboratoriesModel[] = [];

  //constructor(private backConnection: BackConnectionService){}

  getLaboratories()
  {
    //console.log(this.existingLaboratories)
    return this.existingLaboratories.slice();
  }

  getSingleLab(searchedLab: string)
  {
    return this.existingLaboratories.find(arrLab => arrLab.id === searchedLab);
  }

  getLabClasses(labName: string)
  {
    return this.existingLaboratories.find(arrLabName => arrLabName.getName() === labName).getClasses();
  }

  createLab(newLab: LaboratoriesModel)
  {
    //newLab.name = newLab.name.toUpperCase();
    this.existingLaboratories.push(newLab);
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
    //this.backConnection.postLab(newLab);
  }

  updateLab(labUpdatedID: string,labUpdated: LaboratoriesModel)
  {
    const labToUpdateIndex = this.existingLaboratories.findIndex((currentLab) => currentLab.id === labUpdatedID);
    const labToUpdateData = this.existingLaboratories[labToUpdateIndex];
    labToUpdateData.name = labUpdated.name.toUpperCase();
    labToUpdateData.status = labUpdated.status;
    this.existingLaboratories[labToUpdateIndex] = labToUpdateData;
    //console.log(this.existingLaboratories);
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
    //this.backConnection.updateLab(labUpdatedID, labUpdated);
  }

  setLaboratories(backLabsArray: LaboratoriesModel[])
  {
    this.existingLaboratories = backLabsArray;
    //console.log('existingLabs', backLabsArray)
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  getSingleLabClass(labName: string, classIndex: number)
  {
    //console.log({labName, classIndex})
    const classesArray = this.getLabClasses(labName);
    return classesArray[classIndex];
  }

  sendLabArrayUpdate()
  {
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  deleteLab(labToDelete: string)
  {
    const labToDeleteIndex = this.existingLaboratories.findIndex((currentLab) => currentLab.id === labToDelete);
    this.existingLaboratories.splice(labToDeleteIndex, 1);
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

}
