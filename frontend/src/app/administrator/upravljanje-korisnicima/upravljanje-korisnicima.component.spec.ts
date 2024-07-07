import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjeKorisnicimaComponent } from './upravljanje-korisnicima.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpravljanjeKorisnicimaComponent', () => {
  let component: UpravljanjeKorisnicimaComponent;
  let fixture: ComponentFixture<UpravljanjeKorisnicimaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpravljanjeKorisnicimaComponent],
      imports: [HttpClientTestingModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        ReactiveFormsModule,
    BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(UpravljanjeKorisnicimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
