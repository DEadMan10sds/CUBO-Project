export class LaboratoriesModel
{
  id?: string;
  name: string;
  status: boolean;
  classes: string[];

  constructor(_name: string, _status: boolean, _classes: string[], _id?: string)
  {
    this.id = _id;
    this.name = _name;
    this.status = _status;
    this.classes = _classes
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
