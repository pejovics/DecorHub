import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DodavanjeIdejeComponent } from './dodavanje-ideje/dodavanje-ideje.component';
import { PretragaIdejeComponent } from './pretraga-ideje/pretraga-ideje.component';
import { UpravljanjeKorisnicimaComponent } from './administrator/upravljanje-korisnicima/upravljanje-korisnicima.component';
import { UpravljanjeIdejamaComponent } from './administrator/upravljanje-idejama/upravljanje-idejama.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { IdejaKarticaComponent } from './pretraga-ideje/ideja-kartica/ideja-kartica.component';
import { DetaljiIdejeComponent } from './pretraga-ideje/detalji-ideje/detalji-ideje.component';
import { PonudaComponent } from './pretraga-ideje/detalji-ideje/ponuda/ponuda.component';
import { HeaderComponent } from './header/header.component';
import { PonudaInputComponent } from './pretraga-ideje/detalji-ideje/ponuda-input/ponuda-input.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MojeIdejeComponent } from './pretraga-ideje/detalji-ideje/moje-ideje/moje-ideje.component';
import { MatSliderModule } from '@angular/material/slider';
import { RangeSliderComponent } from './pretraga-ideje/detalji-ideje/range-slider/range-slider.component';

import { NgxColorsModule } from 'ngx-colors'

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    DodavanjeIdejeComponent,
    PretragaIdejeComponent,
    UpravljanjeKorisnicimaComponent,
    UpravljanjeIdejamaComponent,
    IdejaKarticaComponent,
    DetaljiIdejeComponent,
    PonudaComponent,
    HeaderComponent,
    PonudaInputComponent,
    MojeIdejeComponent,
    RangeSliderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    NgxSpinnerModule,
    MatSliderModule,
    NgxColorsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
