export class LaboratoriesModel
{
  id?: string;
  name: string;
  status: boolean;
  classes: string[];
  hours: number[];

  constructor(_name: string, _status: boolean, _classes: string[], _hours: number[], _id?: string)
  {
    this.id = _id;
    this.name = _name;
    this.status = _status;
    this.classes = _classes;
    this.hours = _hours;
  }

  getName(): string
  {
    //console.log('getName')
    return this.name;
  }

  get nameLab(): string
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

  getId()
  {
    return this.id;
  }


}
