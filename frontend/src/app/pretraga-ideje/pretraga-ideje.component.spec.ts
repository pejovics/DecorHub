import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaIdejeComponent } from './pretraga-ideje.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

describe('PretragaIdejeComponent', () => {
  let component: PretragaIdejeComponent;
  let fixture: ComponentFixture<PretragaIdejeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PretragaIdejeComponent],
      imports: [HttpClientTestingModule,
        NgxSpinnerModule, FormsModule
      ]
    });
    fixture = TestBed.createComponent(PretragaIdejeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
