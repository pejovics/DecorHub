import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servis.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registracija() {
    if (this.registrationForm.valid) {
      // Ovde možete dodati logiku za slanje podataka na server


      console.log('Uspesna registracija naloga sa username: ' + this.registrationForm.get('username')?.value);
      // this.service.register(this.registrationForm.get('username')?.value,
      //  this.registrationForm.get('password')?.value
      // );
    }
    else{
      console.log('Neuspesna registracija naloga sa username: ' + this.registrationForm.get('username')?.value)
    }
  }
}
