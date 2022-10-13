import { Injectable } from "@angular/core";
import { ClassesModel } from "../models/classes.model";

@Injectable()
export class ClassesService{

  private existingClasses: ClassesModel[] = [
    new ClassesModel('632deeba6f54434b198b8194', 'Cripto', new Date(), 'LCA1', 'Adán Sánchez', 'Cass', false),
    new ClassesModel('632deeba6f54434b198b8192', 'Moviles', new Date(), 'LCA1', 'Adán Sánchez', 'Cass', false),
    new ClassesModel('632deeba6f54434b198b8191', 'Web', new Date(), 'LCA1', 'Adán Sánchez', 'Cass', false),
    new ClassesModel('632deeba6f54434b198b8195', 'Escalables', new Date(), 'LCA1', 'Adán Sánchez', 'Cass', false),
  ];

  getExistingClasses()
  {
    return this.existingClasses.slice();
  }

  getSingleClass(classId: string)
  {
    return this.existingClasses.find(clasMongoID => clasMongoID.getID() === classId);
  }

}
