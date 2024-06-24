export class Produkt {

  id: number = 0;
  naziv: string = "";
  boja: string = "";
  dimenzije: number = 0;

   constructor(naziv: string, boja: string, dimenzije: number){
    this.naziv = naziv;
    this.boja = boja;
    this.dimenzije = dimenzije;
  }


}
