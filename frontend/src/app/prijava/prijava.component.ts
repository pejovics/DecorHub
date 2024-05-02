import { Component } from '@angular/core';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {
  username: string | undefined;
  password: string | undefined;

  login() {
    // Ovdje možete implementirati logiku za provjeru korisničkih podataka
    // i slanje zahtjeva za prijavu na server
    console.log('Korisničko ime:', this.username);
    console.log('Lozinka:', this.password);
    // Nakon što se podaci provjere na serveru, možete izvršiti redirekciju ili
    // neku drugu akciju, kao što je prikazivanje poruke o uspješnoj prijavi.
  }
}
