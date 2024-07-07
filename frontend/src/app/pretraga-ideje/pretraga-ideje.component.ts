import { Component } from '@angular/core';
import { IdejaServis } from '../ideja-servis.service';
import { Ideja } from '../models/Ideja';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms'; // Uvezite FormsModule

@Component({
  selector: 'app-pretraga-ideje',
  templateUrl: './pretraga-ideje.component.html',
  styleUrls: ['./pretraga-ideje.component.css']
})
export class PretragaIdejeComponent {

  constructor(private servis: IdejaServis, private spinner: NgxSpinnerService){

  }

  pojamPretrage: string | undefined;
  ideje: Ideja[] = [];


  ngOnInit(){
    this.spinner.show();
    this.servis.dohvatiSveIdeje().subscribe((ideje)=>{
      ideje.forEach(element => {
       this.ideje.push(element);
      });
      setTimeout(() => {
        this.spinner.hide();
   }, 500);
    });
  }

  dohvatiSveIdeje(){

    this.servis.dohvatiSveIdeje().subscribe((ideje)=>{
      ideje.forEach(element => {
       this.ideje.push(element);
      });
    });

  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.pretraga();
    }
  }

  pretraga(){

      this.spinner.show();
      this.servis.pretraga(this.pojamPretrage!).subscribe((ideje)=>{
        this.ideje = ideje;
        setTimeout(() => {
          this.spinner.hide();
     }, 500);
      });

  }



}
