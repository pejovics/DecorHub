export class User {
  id: number = 0;
  username: string = "";
  email: string = "";
  password: string = "";
  type: Role | undefined;
  obavestenja: {vreme:Date, tekst: string}[] = []


  constructor(id: number, username: string, email: string, password: string, type: Role | undefined){
    this.id = id;
    this.type = type;
    this.username = username;
    this.email = email;
    this.password = password;
  }


}
export enum Role { ADMIN = "Admin", PONUDJAC = "Ponudjac", KUPAC = "Kupac"};

