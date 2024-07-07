import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/users'; // Postaviti odgovarajući URL za backend API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    // Poziv backend API-ja za prijavu
    return this.http.post<User>(this.apiUrl+"/login", { username:username, password:password }).pipe(
      map((response: any) => {
        // Mapiranje podataka u instance klasa
       return new User(0, response.kor_ime,response.email, response.lozinka, response.tip);
      })
    );
  }

  register(user: {
    username: string,
    password: string,
    type: string,
    email: string,
    phone: string,
    image: string,
    company: string
  }): Observable<any> {
    //alert(user.username);
    return this.http.post<User>(this.apiUrl+"/registracija", { user: user  });
  }

  getUsers(): Observable<any[]>{

    return this.http.get<User[]>(this.apiUrl+"/getUsers");
  }

  getUser(korisnik:string): Observable<User>{

    return this.http.get<User>(this.apiUrl+`/getUser/${korisnik}`);
  }
}
