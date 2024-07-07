export class Ponuda {

  id: number = 0;
  ponudjac: string = "";
  cena: number = 0;
  slika: string = "";
  boja: string = "";

   constructor(ponudjac: string, cena: number, slika: string, boja: string){
    this.ponudjac = ponudjac;
    this.cena = cena;
    this.slika = slika;
    this.boja = boja;
  }


}

