import { LaboratoriesModel } from "../models/laboratories.model";
import {Subject} from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService{

  laboratoriesChanges = new Subject<LaboratoriesModel[]>()

  private existingLaboratories: LaboratoriesModel[] = [];

  getLaboratories()
  {
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
    this.existingLaboratories.push(newLab);
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  updateLab(labUpdatedID: string,labUpdated: LaboratoriesModel)
  {
    const labToUpdateIndex = this.existingLaboratories.findIndex((currentLab) => currentLab.id === labUpdatedID);
    const labToUpdateData = this.existingLaboratories[labToUpdateIndex];
    labToUpdateData.name = labUpdated.name.toUpperCase();
    labToUpdateData.status = labUpdated.status;
    this.existingLaboratories[labToUpdateIndex] = labToUpdateData;
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  setLaboratories(backLabsArray: LaboratoriesModel[])
  {
    this.existingLaboratories = backLabsArray;
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  getSingleLabClass(labName: string, classIndex: number)
  {
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

  getLabHours(labID: string)
  {
    const labSearched = this.getSingleLab(labID);
    return labSearched.hours;
  }

}
