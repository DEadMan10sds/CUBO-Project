export class UserModel
{

  id: string;
  name: string;
  surname: string;
  uniKey: number;
  email: string;
  password?: string;
  role: string;

  constructor(id: string, name:string, surname: string, uniKey: number, email: string, role: string, password?: string)
  {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.uniKey = uniKey;
    this.email = email;
    this.role = role;
    this.password = password;
  }

}
