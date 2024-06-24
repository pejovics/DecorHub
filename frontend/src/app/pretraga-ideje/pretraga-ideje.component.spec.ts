import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaIdejeComponent } from './pretraga-ideje.component';

describe('PretragaIdejeComponent', () => {
  let component: PretragaIdejeComponent;
  let fixture: ComponentFixture<PretragaIdejeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PretragaIdejeComponent]
    });
    fixture = TestBed.createComponent(PretragaIdejeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
