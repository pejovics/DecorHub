import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdejaServis } from 'src/app/ideja-servis.service';
import { Ideja } from 'src/app/models/Ideja';
import { Ponuda } from 'src/app/models/Ponuda';
import { Produkt } from 'src/app/models/Produkt';

@Component({
  selector: 'app-ponuda-input',
  templateUrl: './ponuda-input.component.html',
  styleUrls: ['./ponuda-input.component.css'],

})
export class PonudaInputComponent {
  @Output() submitted = new EventEmitter<void>();  // Emituje događaj ka roditelju
  ponudaForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = '';
  ponuda!: Ponuda;
  id!: number;

  color: string = "#ff0000";


  @Input() produkt!: Produkt ;
  @Input() ideja!: Ideja ;

  base64Image!: string;

  constructor(private fb: FormBuilder, private service: IdejaServis) {
    this.ponudaForm = this.fb.group({
      ponudjac: [''],
      cena: [''],
      dimenzije: [''],
      boja: [''],
      slika: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ponudaForm.patchValue({ slika: file });
      this.ponudaForm.get('slika')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.base64Image = reader.result as string; // Postavi Base64 sadržaj

      };
      reader.readAsDataURL(file);
    }
  }

  handleColorChange(event: any): void {
    this.color = event;
  }

  onSubmit() {
    if (this.ponudaForm.valid) {
      //alert(this.ideja);
      const formData = new FormData();
      Object.entries(this.ponudaForm.value).forEach(([key, value]) => {
        //alert(this.ponudaForm.value)
        if (value instanceof Blob) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
          else if (typeof value === 'number') {
        formData.append(key, value.toString());
      }

      });
      console.log(formData);
      // Slanje formData na server može biti ovde
      const ponudjacEntry = formData.get('ponudjac'); // Očekivano: 'John Doe'
      const ponudjac = ponudjacEntry instanceof File ? ponudjacEntry.name : ponudjacEntry?.toString()

      const dimenzijeEntry = formData.get('dimenzije'); // Očekivano: 'John Doe'
      const dimenzije = ponudjacEntry instanceof File ? ponudjacEntry.name : ponudjacEntry?.toString()

      const bojaEntry = formData.get('boja'); // Očekivano: 'John Doe'
      const boja = ponudjacEntry instanceof File ? ponudjacEntry.name : ponudjacEntry?.toString()

      const cenaEntry = formData.get('cena'); // Očekivano: 'John Doe'
      const cena = cenaEntry instanceof File ? cenaEntry.name : cenaEntry?.toString()

      const slikaEntry = formData.get('slika'); // Očekivano: 'John Doe'
      const slika = slikaEntry instanceof File ? slikaEntry.name : slikaEntry?.toString()


      alert(this.color)
      this.ponuda = new Ponuda(ponudjac!, parseInt(cena!),this.base64Image, this.color)

      this.service.dodajPonudu(this.ponuda, this.ideja.id.toString(), this.produkt.id.toString()).subscribe(data=>{
      //  alert(data);
        this.submitted.emit();
      });
    }
  }

}
