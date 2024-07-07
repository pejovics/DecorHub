import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdejaServis } from 'src/app/ideja-servis.service';
import { Ideja } from 'src/app/models/Ideja';

@Component({
  selector: 'app-moje-ideje',
  templateUrl: './moje-ideje.component.html',
  styleUrls: ['./moje-ideje.component.css']
})
export class MojeIdejeComponent {

  constructor(private servis: IdejaServis, private spinner: NgxSpinnerService){

  }
  ideje: Ideja[] = []

  ngOnInit(): void {
    this.spinner.show();
    if (JSON.parse(sessionStorage.getItem("user")!)){
    const username = JSON.parse(sessionStorage.getItem("user")!)["username"];
    //alert(username)
    this.servis.dohvatiMojeIdeje(username).subscribe((ideje)=>{
      ideje.forEach(element => {
       this.ideje.push(element);
      });
      setTimeout(() => {
        this.spinner.hide();
   }, 500);
    });
    }
  }


}
