import { Component } from '@angular/core';
import { IdejaServis } from '../ideja-servis.service';

@Component({
  selector: 'app-pretraga-ideje',
  templateUrl: './pretraga-ideje.component.html',
  styleUrls: ['./pretraga-ideje.component.css']
})
export class PretragaIdejeComponent {

  constructor(private servis: IdejaServis){

  }

  pojamPretrage: string | undefined;

  pretraga(){

      this.servis.pretraga(this.pojamPretrage!).subscribe((users)=>{
        users.forEach(element => {
          alert(element.id);
        });
      });

  }

  

}
