import { Component, ElementRef, ViewChild } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-dodavanje-ideje',
  templateUrl: './dodavanje-ideje.component.html',
  styleUrls: ['./dodavanje-ideje.component.css']
})
export class DodavanjeIdejeComponent {
  @ViewChild('myImage') myImage: ElementRef | undefined;

  @ViewChild('myCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  width : number = 500;
  height : number = 500;


  predictionValue = [{
    class: '- - -',
    score: 0
  }];
  totalObjectsDetected = 0;
  dataLoading = false;

  ngAfterViewInit() {
    if (this.myCanvas && this.myCanvas.nativeElement) {
        this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }
  }


  onImageClick(event: MouseEvent) {

    const image = event.target as HTMLImageElement;
    const container = image.parentElement;
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const rect = image.getBoundingClientRect();
    dot.style.left = event.clientX - rect.left - 5 + 'px';

    dot.style.top = event.clientY - rect.top  + 75 + 'px';

    container?.appendChild(dot);

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.classList.add('show'); // Dodajte klasu koja pokreće animaciju


      const svgNS = 'http://www.w3.org/2000/svg';
      const svgElement = document.createElementNS(svgNS, 'svg');
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');


      const lineElement = document.createElementNS(svgNS, 'line');

      svgElement.style.position = "absolute";
      svgElement.style.top = "0";
      svgElement.style.left = "0";
      svgElement.style.zIndex = '100'; // Postavite manji z-index
      svgElement.style.pointerEvents = 'none';


      svgElement.appendChild(lineElement);

  // Postavite stil linije koristeći CSS

      lineElement.setAttribute('x1', parseInt(dot.style.left) + 2+ "px");
      lineElement.setAttribute('y1', parseInt(dot.style.top)+3 + "px");

      container?.appendChild(svgElement);

    // Kreirajte polja za unos
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Ime');

    const colorInput = document.createElement('input');
    colorInput.setAttribute('type', 'color');

    const dimensionsInput = document.createElement('input');
    dimensionsInput.setAttribute('type', 'text');
    dimensionsInput.setAttribute('placeholder', 'Dimenzije');

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Sačuvaj';
    saveButton.addEventListener('click', () => {
      const name = nameInput.value;
      const color = colorInput.value;
      const dimensions = dimensionsInput.value;

      // Sakrijte ili uklonite formular nakon čuvanja
      formContainer.remove();
    });

    formContainer.appendChild(nameInput);
    formContainer.appendChild(colorInput);
    formContainer.appendChild(dimensionsInput);
    formContainer.appendChild(saveButton);


    //container?.appendChild(dot);
    container?.parentElement?.append(formContainer);
    lineElement.setAttribute('x2', formContainer.offsetLeft+"");
    lineElement.setAttribute('y2', formContainer.offsetTop - formContainer.clientHeight+"");


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

      lineElement.setAttribute('x2', parseInt(formContainer.style.left)+"");
      lineElement.setAttribute('y2', parseInt(formContainer.style.top) - formContainer.clientHeight +"");

    }
  }

  function onMouseUp() {
    isDragging = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }



  }


  // load the tenseflow object detection model and send video stram to model an get response
  async loadImageDetection() {
    this.dataLoading = true;

    await tf.setBackend('webgl');
    cocoSsd.load().then(model => {
      model.detect(this.myImage?.nativeElement).then(predictions => {


        const confidenceThreshold = 0.1;

        // Filtriraj predikcije na osnovu granice za sigurnost
        predictions = predictions.filter(prediction => prediction.score >= confidenceThreshold);



        this.predictionValue = predictions;
        this.totalObjectsDetected = predictions.length
        this.dataLoading = false;

        predictions.forEach(prediction => {

        this.drawBoundingBoxes(prediction.bbox);
        });

      });
    });;



  }

  drawBoundingBoxes(predictions: [number, number, number, number]) {
    //this.ctx?.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    predictions.forEach(prediction => {
      //const { ymin, xmin, ymax, xmax } = prediction;
      const ymin = predictions[0]; const xmin = predictions[1]; const ymax = predictions[2]; const xmax = predictions[3];
      const x = xmin * this.myCanvas.nativeElement.width;
      const y = ymin * this.myCanvas.nativeElement.height;
      const width = Math.abs(xmax - xmin) ;
      const height = Math.abs(ymax - ymin);

      if (this.ctx){
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(ymin, xmin, height, width);
      }
    });
  }


  dodavanjeIdeje(){

  }

}
