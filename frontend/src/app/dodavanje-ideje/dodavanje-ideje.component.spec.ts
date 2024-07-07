import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeIdejeComponent } from './dodavanje-ideje.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

describe('DodavanjeIdejeComponent', () => {
  let component: DodavanjeIdejeComponent;
  let fixture: ComponentFixture<DodavanjeIdejeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjeIdejeComponent],
      imports: [HttpClientTestingModule,
        NgxSpinnerModule,
        FormsModule 
      ]
    });
    fixture = TestBed.createComponent(DodavanjeIdejeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
