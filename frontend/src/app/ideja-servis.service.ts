import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Ideja } from './models/Ideja';

@Injectable({
  providedIn: 'root'
})
export class IdejaServis {
  private apiUrl = 'http://localhost:4000/idea'; // Postaviti odgovarajući URL za backend API

  constructor(private http: HttpClient) {}

  dodajIdeju(ideja: Ideja): Observable<User> {

    return this.http.post<User>(this.apiUrl+"/dodajIdeju", { ideja: ideja});

  }
}
