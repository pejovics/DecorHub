import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DodavanjeIdejeComponent } from './dodavanje-ideje/dodavanje-ideje.component';
import { PretragaIdejeComponent } from './pretraga-ideje/pretraga-ideje.component';
import { UpravljanjeKorisnicimaComponent } from './administrator/upravljanje-korisnicima/upravljanje-korisnicima.component';
import { UpravljanjeIdejamaComponent } from './administrator/upravljanje-idejama/upravljanje-idejama.component';

const routes: Routes = [
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'dodavanje_ideje', component: DodavanjeIdejeComponent },
  { path: 'pretraga_ideje', component: PretragaIdejeComponent },
  { path: 'admin/korisnici', component: UpravljanjeKorisnicimaComponent },
  { path: 'admin/ideje', component: UpravljanjeIdejamaComponent }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
