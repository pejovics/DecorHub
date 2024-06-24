import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/servis.service';

@Component({
  selector: 'app-upravljanje-korisnicima',
  templateUrl: './upravljanje-korisnicima.component.html',
  styleUrls: ['./upravljanje-korisnicima.component.css']
})
export class UpravljanjeKorisnicimaComponent {

  constructor(private servis: AuthService){ }

  filteredKorisnici = this.korisnici;
  searchControl = new FormControl('');

  ngOnInit(): void{
    this.korisnici = [];
    this.servis.getUsers().subscribe((users)=>{

      users.forEach(element =>{
        this.korisnici?.push(new User(element.id, element.kor_ime, element.email, element.lozinka))}
      );

    });

  }


  korisnik: string | undefined;
  korisnici?: User[];


  // pretragaKorisnika(korisnik: string){

  //   this.servis.getUser(korisnik).subscribe(()=>{

  //   });

// }

filterKorisnici(value: string): void {
  this.filteredKorisnici = this.korisnici?.filter(kor =>
    kor.username.toLowerCase().includes(value.toLowerCase())
  );
}

blokirajKorisnika(kor: any): void {
  console.log(`Korisnik ${kor.username} je blokiran.`);
  // Dodajte logiku za blokiranje korisnika ovde
}

pretragaKorisnika(query: string): void {
  this.filterKorisnici(query);
}

}
