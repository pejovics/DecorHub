import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../servis.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService) { }

  base64Image: string = '';

  user = {
    username: '',
    password: '',
    type: 'kupac',
    email: '',
    phone: '',
    image: '',
    company: ''
  };

  register(form: NgForm) {
    if (form.valid) {
      //ODRADI SVE PROVERE ZA REGISTRACIJU
      this.service.register(this.user).subscribe(resp =>{
        alert("dobarr")

      })
    }
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.user.image = file;


      if (file) {

        const reader = new FileReader();
        reader.onload = () => {
          this.base64Image = reader.result as string; // Postavi Base64 sadržaj
          this.user.image = this.base64Image;
        };
        reader.readAsDataURL(file);
      }

    }
  }
}
