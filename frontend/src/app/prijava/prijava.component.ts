import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {
  username: string | undefined;
  password: string | undefined;


    login(loginForm: NgForm) {
      // Proveravamo da li forma ima greške pre slanja podataka
      if (loginForm.invalid) {
        // Ako forma nije validna, obustavljamo proces prijave
        return;
      }

      // Ako forma je validna, možete nastaviti sa obradom podataka (npr. slanjem na server)
      console.log('Prijavljivanje korisnika sa korisničkim imenom:', this.username, 'i lozinkom:', this.password);
    }

}
