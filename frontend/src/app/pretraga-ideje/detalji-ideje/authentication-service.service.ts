import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { }

  // Proverite da li je korisnik autentifikovan
  isAuthenticated(): boolean {
    const user = sessionStorage.getItem("user");
    return user !== null;
  }

  // Dodajte metode za login i logout ako je potrebno
  login(username: string, password: string): boolean {
    // Dodajte logiku za proveru korisnika
    if (username === 'demo' && password === 'demo') {
      sessionStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
  }
}
