export interface ClassInterface
{
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
}