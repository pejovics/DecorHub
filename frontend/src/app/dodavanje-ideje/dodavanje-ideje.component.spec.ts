import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeIdejeComponent } from './dodavanje-ideje.component';

describe('DodavanjeIdejeComponent', () => {
  let component: DodavanjeIdejeComponent;
  let fixture: ComponentFixture<DodavanjeIdejeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjeIdejeComponent]
    });
    fixture = TestBed.createComponent(DodavanjeIdejeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
