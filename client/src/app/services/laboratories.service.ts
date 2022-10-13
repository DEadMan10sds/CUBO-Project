import { LaboratoriesModel } from "../models/laboratories.model";
import {Subject} from "rxjs";
export class LaboratoriesService{

  laboratoriesChanges = new Subject<LaboratoriesModel[]>()

  private existingLaboratories: LaboratoriesModel[] = [];

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

  setLaboratories(backLabsArray: LaboratoriesModel[])
  {
    this.existingLaboratories = backLabsArray;
    //console.log('existingLabs', backLabsArray)
    this.laboratoriesChanges.next(this.existingLaboratories.slice());
  }

  getSingleLabClass(labName: string, classIndex: number)
  {
    console.log({labName, classIndex})
    const classesArray = this.getLabClasses(labName);
    return classesArray[classIndex];
  }
}
