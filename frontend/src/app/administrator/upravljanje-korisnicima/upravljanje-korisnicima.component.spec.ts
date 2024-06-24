import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjeKorisnicimaComponent } from './upravljanje-korisnicima.component';

describe('UpravljanjeKorisnicimaComponent', () => {
  let component: UpravljanjeKorisnicimaComponent;
  let fixture: ComponentFixture<UpravljanjeKorisnicimaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpravljanjeKorisnicimaComponent]
    });
    fixture = TestBed.createComponent(UpravljanjeKorisnicimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
