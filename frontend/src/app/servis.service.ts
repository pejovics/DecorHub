import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/users'; // Postaviti odgovarajući URL za backend API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    // Poziv backend API-ja za prijavu
    return this.http.post<User>(this.apiUrl+"/login", { username:username, password:password });
  }

  register(username: string, password: string): Observable<any> {

    return this.http.post<User>(this.apiUrl+"/register", { username:username, password:password });
  }

  getUsers(): Observable<any[]>{

    return this.http.get<User[]>(this.apiUrl+"/getUsers");
  }

  getUser(korisnik:string): Observable<User[]>{

    return this.http.get<User[]>(this.apiUrl+"/getUser?" + korisnik);
  }
}
