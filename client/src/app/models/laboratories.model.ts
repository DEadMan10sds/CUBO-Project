import { ClassesModel } from "./classes.model";

export class LaboratoriesModel
{
  private name: string;
  private status: boolean;
  private classes: string[];

  constructor(_name: string, _status: boolean, _classes: string[])
  {
    this.name = _name;
    this.status = _status;
    this.classes = _classes
  }

  getName()
  {
    return this.name;
  }

  get nameLab()
  {
    return this.name;
  }

  getStatus()
  {
    return this.status;
  }

  getClasses()
  {
    return this.classes.slice();
  }


}
