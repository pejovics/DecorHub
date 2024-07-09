import { Component, ElementRef, ViewChild } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { Produkt } from '../models/Produkt';
import { IdejaServis } from '../ideja-servis.service';
import { Ideja } from '../models/Ideja';
import { Container } from './Container';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dodavanje-ideje',
  templateUrl: './dodavanje-ideje.component.html',
  styleUrls: ['./dodavanje-ideje.component.css'],
})
export class DodavanjeIdejeComponent {
  @ViewChild('myImage') myImage: ElementRef | undefined;

  @ViewChild('myCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  imgSrc : string | undefined;
  tagovi: {naziv: string}[]= [];
  private currentId = 0;

  listContainer : Container[] = []

  width: number = 500;
  height: number = 500;

  produkti: Produkt[] = [];

  color: string = "#ff0000";

  base64Image: string | undefined;

  constructor(private service: IdejaServis, private spinner: NgxSpinnerService,  private router: Router) {

  }

  predictionValue = [
    {
      class: '- - -',
      score: 0,
    },
  ];
  totalObjectsDetected = 0;
  dataLoading = false;
  optImg : HTMLImageElement | undefined;
  idNoveIdeje : number = 0;

  ngAfterViewInit() {
    if (this.myCanvas && this.myCanvas.nativeElement) {
      this.ctx = this.myCanvas.nativeElement.getContext('2d');
    }
  }

  handleColorChange(event: any): void{

    this.color = event;

  }

  onImageClick(event: MouseEvent) {
    //alert("eeee")
    const image = event.target as HTMLImageElement;
    const container = image.parentElement;
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const rect = image.getBoundingClientRect();
    dot.style.left = event.clientX - rect.left  + 'px';

    dot.style.top = event.clientY - rect.top  + 'px';

    container?.appendChild(dot);

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.classList.add('show'); // Dodajte klasu koja pokreće animaciju



    const svgNS = 'http://www.w3.org/2000/svg';
    const svgElement = document.createElementNS(svgNS, 'svg');
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');

    const lineElement = document.createElementNS(svgNS, 'line');

    svgElement.style.position = 'absolute';
    svgElement.style.top = '0';
    svgElement.style.left = '0';
    svgElement.style.zIndex = '100'; // Postavite manji z-index
    svgElement.style.pointerEvents = 'none';

    svgElement.appendChild(lineElement);

    // Postavite stil linije koristeći CSS

    lineElement.setAttribute('x1', parseInt(dot.style.left) + 2 + 'px');
    lineElement.setAttribute('y1', parseInt(dot.style.top) + 3 + 'px');

    container?.appendChild(svgElement);

    this.listContainer.push(new Container(formContainer, lineElement))

    // Kreirajte polja za unos
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Ime');

    const colorInput = document.createElement('input');
    colorInput.setAttribute('type', 'color');

    // const colorInput = document.createElement('ngx-colors')
    // colorInput.setAttribute('ngx-colors-trigger', '');
    // colorInput.setAttribute('[ngModel]', 'color');
    // colorInput.setAttribute('(change)', 'handleColorChange($event)');
    // colorInput.setAttribute('[format]', "'hex'");

    const dimensionsInput = document.createElement('input');
    dimensionsInput.setAttribute('type', 'text');
    dimensionsInput.setAttribute('placeholder', 'Dimenzije');

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Sačuvaj';
    saveButton.addEventListener('click', () => {
      const name = nameInput.value;
      const color = this.color;
      const dimensions = dimensionsInput.value;

      this.produkti.push(new Produkt(this.currentId++, name, color, dimensions,[dot.style.left, dot.style.top], []));
      this.tagovi.push({naziv: name});

      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('item-wrapper');
      itemWrapper.appendChild(formContainer);
      lineElement.remove()

      // Sakrijte ili uklonite formular nakon čuvanja
      formContainer.removeAttribute('style');


      const elementList = document.getElementById('element-list');
      if (elementList) {
        elementList.appendChild(itemWrapper);
      }
    });

    formContainer.appendChild(nameInput);
    formContainer.appendChild(colorInput);
    formContainer.appendChild(dimensionsInput);
    formContainer.appendChild(saveButton);

    //container?.appendChild(dot);
    container?.parentElement?.append(formContainer);
    lineElement.setAttribute('x2', formContainer.offsetLeft + '');
    lineElement.setAttribute('y2', formContainer.offsetTop + ''
    );

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    formContainer.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX - formContainer.offsetLeft;
      startY = e.clientY - formContainer.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });



    function onMouseMove(e: MouseEvent) {
      if (isDragging) {
        formContainer.style.left = `${e.clientX - startX}px`;
        formContainer.style.top = `${e.clientY - startY}px`;

        lineElement.setAttribute('x2', parseInt(formContainer.style.left) + '');
        lineElement.setAttribute(
          'y2',
          parseInt(formContainer.style.top) + ''
        );
      }
    }

    function onMouseUp() {
      isDragging = false;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  autoGenerisanje(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.idNoveIdeje
      }
    };
    this.router.navigate(['/auto-generisanje-ponuda', this.idNoveIdeje])
  }

  // load the tenseflow object detection model and send video stram to model an get response
  async loadImageDetection() {
    this.spinner.show()
    this.dataLoading = true;

    await tf.setBackend('webgl');
    cocoSsd.load().then((model) => {
      model.detect(this.optImg!).then((predictions) => {
        const confidenceThreshold = 0.1;

        // Filtriraj predikcije na osnovu granice za sigurnost
        predictions = predictions.filter(
          (prediction) => prediction.score >= confidenceThreshold
        );

        this.predictionValue = predictions;
        this.totalObjectsDetected = predictions.length;
        this.dataLoading = false;

        predictions.forEach((prediction) => {
          this.drawBoundingBoxes(prediction.bbox);
        });
        this.spinner.hide()
      });
    });
  }

  drawBoundingBoxes(predictions: [number, number, number, number]) {
    //this.ctx?.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    //predictions.forEach((prediction) => {
      //const { ymin, xmin, ymax, xmax } = prediction;
      const ymin = predictions[0];
      const xmin = predictions[1];
      const ymax = predictions[2];
      const xmax = predictions[3];
      const width = Math.abs(xmax - xmin);
      const height = Math.abs(ymax - ymin);

      if (this.ctx) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        //alert("iscrtao na"+ " "+ ymin+ " "+ xmin+ " "+ height+ " " + width)
        this.ctx.strokeRect(xmin, ymin, width, height);
        //this.ctx.strokeRect(0, 0, 120, 10);
      }
    //});
  }

  dodavanjeIdeje() {
    const ideja: Ideja = new Ideja();

    const username = JSON.parse(sessionStorage.getItem("user")!)["username"]
    ideja.autor = username;
    ideja.produkti = this.produkti;
    ideja.slika = this.convertImageToBase64()!;
    ideja.tagovi = this.tagovi;
    //ideja.slika = this.convertToBase64();

    this.spinner.show();

    this.service.dodajIdeju(ideja).subscribe((resp) => {
      //this.spinner.hide();
      setTimeout(() => {
        this.spinner.hide();
   }, 2000);
      if (resp.code == '200') {
        this.idNoveIdeje = resp.id
      }
    });
  }
  removeTag(tagToRemove: { naziv: string }) {
    this.tagovi = this.tagovi.filter(tag => tag !== tagToRemove);
  }

  newTag: string = '';

  addTag() {
    if (this.newTag.trim()) {
      this.tagovi.push({ naziv: this.newTag.trim() });
      this.newTag = ''; // Resetuje unos nakon dodavanja
    }
  }

  getBase64(event: any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      //alert(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  if (file) {
    this.optimizeImage(file, 800, 800, 0.8).then((optimizedBase64) => {
      this.imgSrc = optimizedBase64;
      this.base64Image = optimizedBase64; // Sačuvamo optimizovani Base64 za slanje
    });
  }
}

  convertToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      // Ovde dobijamo Base64 string
      const base64String = reader.result as string;
      //alert(base64String)
      console.log(base64String);
      // Možete dalje raditi sa base64String-om, npr. poslati na server
    };

    reader.readAsDataURL(file);

  }

  convertImageToBase64() {
    if (!this.myImage || !this.myImage.nativeElement) {
      console.error('No image found!');
      return null;
    }

    const image = this.myImage.nativeElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    if (ctx) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Konvertujte u Base64
      const dataURL = canvas.toDataURL('image/jpeg'); // Format može biti 'image/png' ili 'image/jpeg'
      console.log('Base64 String:', dataURL);
      //alert(dataURL)
      return dataURL;
    }
    return null;
  }

  optimizeImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Proporcionalno smanjujemo veličinu slike
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Konvertujemo u Base64
          const dataURL = canvas.toDataURL('image/jpeg', quality); // Adjust quality 0.0 to 1.0
          resolve(dataURL);
        };
        img.src = event.target?.result as string;
        this.optImg = img;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


}
