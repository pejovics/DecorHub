import { Ponuda } from "./Ponuda";

export class Produkt {

  id: number = 0;
  naziv: string = "";
  boja: string = "";
  dimenzije: string = "";
  ponude: Ponuda[] = [];
  tacka: [string, string] = ["", ""];

   constructor(id: number,naziv: string, boja: string, dimenzije: string, tacka: [string, string], ponude: []){
    this.id = id;
    this.naziv = naziv;
    this.boja = boja;
    this.dimenzije = dimenzije;
    this.tacka = tacka;
  }


}
