import { ClassesModel } from "../models/classes.model";
import { LaboratoriesModel } from "../models/laboratories.model";

export class LaboratoriesService{

  private existingLaboratories: LaboratoriesModel[] = [
    new LaboratoriesModel("LCA1", true, []),
    new LaboratoriesModel("LCA2", true, [
      "632deeba6f54434b198b8194",
      "632deeba6f54434b198b8194",
      "632deeba6f54434b198b8194"
    ],),
    new LaboratoriesModel("LCA3", true, []),
  ];

  getLaboratories()
  {
    return this.existingLaboratories.slice();
  }

  getLabClasses(labName: string)
  {
    return this.existingLaboratories.find(arrLabName => arrLabName.getName() === labName).getClasses().slice();
  }

  getSingleLabClass(labName: string, classIndex: number)
  {
    console.log({labName, classIndex})
    const classesArray = this.getLabClasses(labName);
    return classesArray[classIndex];
  }

}
