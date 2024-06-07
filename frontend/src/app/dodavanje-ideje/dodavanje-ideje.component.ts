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

  predictionValue = [{
    class: '- - -',
    score: 0
  }];
  totalObjectsDetected = 0;
  dataLoading = false;

  onImageClick(event: MouseEvent) {
    const image = event.target as HTMLImageElement;
    const container = image.parentElement;
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const rect = image.getBoundingClientRect();
    dot.style.left = event.clientX - rect.left - 5 + 'px';
    dot.style.top = event.clientY - rect.top  + 75 + 'px';

    container?.appendChild(dot);

  }


  // load the tenseflow object detection model and send video stram to model an get response
  async loadImageDetection() {
    this.dataLoading = true;

    await tf.setBackend('webgl');
    cocoSsd.load().then(model => {
      model.detect(this.myImage?.nativeElement).then(predictions => {
        this.predictionValue = predictions;
        this.totalObjectsDetected = predictions.length
        this.dataLoading = false;
      });
    });;
  }

}
