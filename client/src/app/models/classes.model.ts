export class ClassesModel{

  id: string;
  name: string;
  date: Date;
  place: string;
  teacher: string;
  type: string;
  free: boolean;
  recurrency: string[];

  constructor(_mongoID: string, _name: string, _date: Date, _place: string, _teacher: string, _type: string, _free: boolean)
  {
    this.id = _mongoID;
    this.name = _name;
    this.date = _date;
    this.place = _place;
    this.teacher = _teacher;
    this.type = _type;
    this.free = _free;
  };

  getName()
  {
    return this.name;
  }

  getDate()
  {
    return this.date;
  }

  getType()
  {
    return this.type;
  }

  getFree()
  {
    return this.free;
  }

  getPlace()
  {
    return this.place;
  }

  getAddedHour()
  {
    return this.date.setHours(this.date.getHours() + 1);
  }

  getID()
  {
    return this.id;
  }


  setHour(newHour: number)
  {
    this.date.setHours(newHour, 0, 0);
  }
}
