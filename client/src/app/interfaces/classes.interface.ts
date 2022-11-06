export class ClassInterface {
  name: string;
  startDate: Date;
  endDate: Date;
  status: boolean;
  teacher:
    | string
    | {
        _id: string;
        name: string;
        surname: string;
      };
  type: string;
  authorized: boolean;
  recurrent: boolean;
  repeats: string[];
  place:
    | string
    | {
        _id: string;
        name: string;
      };
  free?: boolean;
  editedAt?: Date;
  createdAt?: Date;
  hour: number;
  id: string;
}
