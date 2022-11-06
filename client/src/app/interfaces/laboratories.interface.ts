export class Laboratories {
  id: string;
  name: string;
  date: string[];
  place: {
    _id: string;
    name: string;
  };
  status: boolean;
  teacher?: {
    _id: string;
    name: string;
  };
  hours: number[];
  type: string;
  authorized: boolean;
  recurrent: boolean;
}
