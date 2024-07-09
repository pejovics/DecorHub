import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DodavanjeIdejeComponent } from './dodavanje-ideje/dodavanje-ideje.component';
import { PretragaIdejeComponent } from './pretraga-ideje/pretraga-ideje.component';
import { UpravljanjeKorisnicimaComponent } from './administrator/upravljanje-korisnicima/upravljanje-korisnicima.component';
import { UpravljanjeIdejamaComponent } from './administrator/upravljanje-idejama/upravljanje-idejama.component';
import { DetaljiIdejeComponent } from './pretraga-ideje/detalji-ideje/detalji-ideje.component';
import { MojeIdejeComponent } from './pretraga-ideje/detalji-ideje/moje-ideje/moje-ideje.component';
import { authGuard } from './pretraga-ideje/detalji-ideje/auth.guard';
import { AutoGenerisanjePonudaComponent } from './pretraga-ideje/detalji-ideje/auto-generisanje-ponuda/auto-generisanje-ponuda.component';

const routes: Routes = [
  { path: 'prijava', component: PrijavaComponent },
  { path: '', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'dodavanje_ideje', component: DodavanjeIdejeComponent,canActivate: [authGuard] },
  { path: 'pretraga_ideje', component: PretragaIdejeComponent, canActivate: [authGuard] },
  { path: 'admin/korisnici', component: UpravljanjeKorisnicimaComponent, canActivate: [authGuard] },
  { path: 'admin/ideje', component: UpravljanjeIdejamaComponent, canActivate: [authGuard] },
  { path: 'detalji-ideje/:id', component: DetaljiIdejeComponent, canActivate: [authGuard] },
  { path: 'moje-ideje', component: MojeIdejeComponent, canActivate: [authGuard] },
  { path: 'auto-generisanje-ponuda/:id', component: AutoGenerisanjePonudaComponent, canActivate: [authGuard] },

]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
