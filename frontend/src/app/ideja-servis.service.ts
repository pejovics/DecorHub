import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Ideja } from './models/Ideja';

@Injectable({
  providedIn: 'root'
})
export class IdejaServis {
  private apiUrl = 'http://localhost:4000'; // Postaviti odgovarajući URL za backend API

  constructor(private http: HttpClient) {}

  dodajIdeju(ideja: Ideja): Observable<{code:string}> {

    return this.http.post<{code:string}>(this.apiUrl+"/dodajIdeju", { ideja: ideja});

  }

  pretraga(pojamPretrage: string): Observable<Ideja[]> {

    return this.http.post<Ideja[]>(this.apiUrl+"/pretraga", { pojamPretrage: pojamPretrage});

  }

}