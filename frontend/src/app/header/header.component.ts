import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdejaServis } from '../ideja-servis.service';
import { AuthService } from '../servis.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private servis: AuthService) { }
  tipKorisnika!: string;

  notifications: {vreme: Date, tekst: string}[] = [];
  brojNovosti = 0;
  obavestenjaPrikaz:{vreme: Date, tekst: string}[] = [];
  sanduceOtvoreno: boolean = false;

  username: string = "";

  ngOnInit(): void {

    if (sessionStorage.getItem("user")){
      this.tipKorisnika = JSON.parse(sessionStorage.getItem("user")!)["type"];
      this.username = JSON.parse(sessionStorage.getItem("user")!)["username"]
      this.loadNotifications();
    }else{
      this.router.navigate(['/prijava-component']);
    }
  }

  loadNotifications(): void {
      this.servis.getUser(JSON.parse(sessionStorage.getItem("user")!)["username"]).subscribe(
        (korisnik) => {
          this.notifications = korisnik.obavestenja;
          this.brojNovosti = korisnik.obavestenja.length;
          //alert(this.brojNovosti)
        },
        (error) => {
          console.error('Error fetching notifications', error);
        }
      );

  }

  oznaciKaoProcitano(notificationId: string): void {
    // this.servis.oznaciKaoProcitano(notificationId).subscribe(() => {
    //   this.loadNotifications(); // Ponovno učitavanje obaveštenja
    // });
  }

  prijava():void{
    this.router.navigate(['/prijava']); // Preusmerite korisnika na stranicu za prijavu

  }
  registracija():void{
    this.router.navigate(['/registracija']); // Preusmerite korisnika na stranicu za prijavu

  }

  logout(): void {
    // Implementirajte logiku za odjavljivanje, npr. brisanje tokena ili sesije
    // Nakon odjave, preusmerite korisnika na početnu stranicu
    // Na primer:
    // localStorage.removeItem('token'); // Ako koristite local storage za čuvanje tokena
    this.router.navigate(['/prijava']); // Preusmerite korisnika na stranicu za prijavu
  }

  login(): void {
    this.router.navigate(['/prijava']); // Preusmerite korisnika na stranicu za prijavu
  }


  otvoriProfil() {
    // Logika za otvaranje korisničkog profila
    console.log('Otvaranje profila korisnika');
  }

  otvoriSanduce() {

    this.obavestenjaPrikaz = this.sanduceOtvoreno  ? this.notifications : [];
    this.sanduceOtvoreno = !this.sanduceOtvoreno;
  }

}
