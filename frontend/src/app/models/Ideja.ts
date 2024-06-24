import { Objekat } from "./Objekat";
import { Produkt } from "./Produkt";

export type Ocena = 1 | 2 | 3 | 4 | 5 | null;;

export class Ideja {
  id: number = 0;
  madeBy: string = "";
  ocena: Ocena = null;
  objekti: Objekat[] = [];
  produkti: Produkt[] = [];
  slika: string | undefined;
}
