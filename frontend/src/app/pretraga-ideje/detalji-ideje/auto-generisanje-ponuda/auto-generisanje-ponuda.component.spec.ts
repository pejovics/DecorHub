import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerisanjePonudaComponent } from './auto-generisanje-ponuda.component';

describe('AutoGenerisanjePonudaComponent', () => {
  let component: AutoGenerisanjePonudaComponent;
  let fixture: ComponentFixture<AutoGenerisanjePonudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoGenerisanjePonudaComponent]
    });
    fixture = TestBed.createComponent(AutoGenerisanjePonudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
