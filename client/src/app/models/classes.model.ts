import { ClassInterface } from "./interface/classInterface.interface";
export class ClassesModel implements ClassInterface{

  id: string;
  name: string;
  date: Date;
  place: string;
  status: boolean;
  free: boolean;
  teacher: string;
  teacherName?: string;
  type: string;
  authorized: boolean;
  recurrent: boolean;
  repeats: string[];
  hour: number;
  startDate: Date;
  endDate: Date;

  constructor(classsData: ClassInterface)
  {
    this.id = classsData.id;
    this.name = classsData.name;
    this.date = classsData.date;
    this.place = classsData.place;
    this.status = classsData.status,
    this.free = classsData.free;
    this.teacher = classsData.teacher;
    this.type = classsData.type;
    this.authorized = classsData.authorized;
    this.recurrent = classsData.recurrent,
    this.repeats = classsData.repeats,
    this.hour = classsData.hour,
    this.startDate = classsData.startDate,
    this.endDate = classsData.endDate
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
