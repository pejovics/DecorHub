import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaComponent } from './ponuda.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxColorsModule } from 'ngx-colors';

describe('PonudaComponent', () => {
  let component: PonudaComponent;
  let fixture: ComponentFixture<PonudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PonudaComponent],
      imports: [HttpClientTestingModule,
        NgxColorsModule
      ]
    });
    fixture = TestBed.createComponent(PonudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
