import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './models/User';
import { Ideja } from './models/Ideja';
import { Ponuda } from './models/Ponuda';

@Injectable({
  providedIn: 'root'
})
export class IdejaServis {
  private apiUrl = 'http://localhost:4000'; // Postaviti odgovarajući URL za backend API

  constructor(private http: HttpClient) {}

  dodajIdeju(ideja: Ideja): Observable<{code:string}> {

    return this.http.post<{code:string}>(this.apiUrl+"/dodajIdeju", { ideja: ideja});

  }

  dohvatiSveIdeje(){
    return this.http.get<Ideja[]>(this.apiUrl+"/dohvatiSveIdeje");
  }

  dohvatiIdejuPoId(id: number){
    return this.http.get<Ideja>(this.apiUrl+"/dohvatiIdejuPoId/" + `${id}`).pipe(
      map((response: any) => {
        // Mapiranje podataka u instance klasa
        const ideja = new Ideja();
        ideja.id = response.id;
        ideja.autor = response.autor;
        ideja.ocena = response.ocena;
        ideja.objekti = response.objekti; // Ovo morate ručno mapirati u instance objekata i produkata
        ideja.produkti = response.produkti; // Ovo morate ručno mapirati u instance produkata
        ideja.slika = response.slika;
        ideja.tagovi = response.tagovi;
        return ideja;
      })
    );
  }

  dohvatiMojeIdeje(username: string){
    return this.http.get<Ideja[]>(this.apiUrl+"/dohvatiMojeIdeje/" + `${username}`);
  }

  pretraga(pojamPretrage: string): Observable<Ideja[]> {

    return this.http.post<Ideja[]>(this.apiUrl+"/pretraga", { kljucnaRec: pojamPretrage});

  }

  dodajPonudu(ponuda: Ponuda, idIdeja: string, idProdukt: string){
    alert('idd: ' + idProdukt)
    return this.http.post<{code: string}>(this.apiUrl+"/dodajPonudu", { ponuda: ponuda, idIdeja: idIdeja, idProdukt: idProdukt});

  }

  dohvatiObavestenja(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/dohvatiObavestenja/${userId}`);
  }

  oznaciKaoProcitano(notificationId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/oznaciKaoProcitano/${notificationId}`, {});
  }

}
