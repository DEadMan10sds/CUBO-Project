export class UserModel
{
  name: string;
  surname: string;
  uniKey: number;
  email: string;
  password?: string;
  role: string;

  constructor(name:string, surname: string, uniKey: number, email: string, role: string, password?: string)
  {
    this.name = name;
    this.surname = surname;
    this.uniKey = uniKey;
    this.email = email;
    this.role = role;
    this.password = password;
  }

}
