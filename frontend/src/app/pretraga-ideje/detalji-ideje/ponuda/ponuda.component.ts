import { Component, Input } from '@angular/core';
import { Ponuda } from 'src/app/models/Ponuda';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.css']
})
export class PonudaComponent {

  @Input() ponuda!: Ponuda ;
  imgSrc!: string;
  selectedColor: string = "#ff0000"

  ngOnInit(): void {
    if (this.ponuda){
        this.convertBase64ToImage(this.ponuda.slika!);
        this.selectedColor = this.ponuda.boja;
    }
  }

  base64ToBlob(base64: string, contentType: string = ''): Blob {
    //alert(base64)
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    //alert(byteArrays)
    return new Blob(byteArrays, { type: contentType });
  }


  convertBase64ToImage(slika: string) {
    const contentType = 'image/jpeg'; // Promenite ovo prema tipu vašeg sadržaja
    const base64Data = slika.split(',')[1]; // Uklonite `data:image/jpeg;base64,` deo ako je prisutan
    const blob = this.base64ToBlob(base64Data, contentType);

    // Kreirajte URL za Blob koji možete koristiti za prikaz slike
    this.imgSrc = URL.createObjectURL(blob);
  }


}
