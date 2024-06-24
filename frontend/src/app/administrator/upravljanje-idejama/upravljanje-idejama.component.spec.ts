import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjeIdejamaComponent } from './upravljanje-idejama.component';

describe('UpravljanjeIdejamaComponent', () => {
  let component: UpravljanjeIdejamaComponent;
  let fixture: ComponentFixture<UpravljanjeIdejamaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpravljanjeIdejamaComponent]
    });
    fixture = TestBed.createComponent(UpravljanjeIdejamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
