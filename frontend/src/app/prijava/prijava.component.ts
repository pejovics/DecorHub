import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from '../servis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {

  constructor(private service: AuthService, private router: Router) { }

  PASSWORD_MIN_LENGTH:number = 8;
  USERNAME_MIN_LENGTH:number = 4;

  username: string = "";
  password: string = "";



    login(loginForm: NgForm) {
      // Proveravamo da li forma ima greške pre slanja podataka
      if (loginForm.invalid) {
        // Ako forma nije validna, obustavljamo proces prijave
        return;
      }
      if (this.username === ""){
        console.log('Username nije u skladu sa pravilima!');
        return;
      }
      if (this.password === ""){
        console.log('Password nije u skladu sa pravilima!');
        return;
      }

      this.service.login(this.username, this.password).subscribe((korisnik)=>{

        this.router.navigate(['/pretraga_ideje']);
        sessionStorage.setItem("user", JSON.stringify(korisnik));

      });

      console.log('Prijavljivanje korisnika sa korisničkim imenom:', this.username);
    }

    checkUsername(username: string){
      if (username.length < this.USERNAME_MIN_LENGTH){
        console.log('Username nije u skladu sa pravilima!')
        return false
      }
      return true;
    }

    checkPassword(password: string){
      if (password.length < this.PASSWORD_MIN_LENGTH){
        console.log('Password nije u skladu sa pravilima!')
        return false
      }
      return true;
    }

}
