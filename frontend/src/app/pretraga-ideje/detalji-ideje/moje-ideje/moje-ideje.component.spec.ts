import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeIdejeComponent } from './moje-ideje.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('MojeIdejeComponent', () => {
  let component: MojeIdejeComponent;
  let fixture: ComponentFixture<MojeIdejeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojeIdejeComponent],
      imports: [HttpClientTestingModule,
        NgxSpinnerModule
      ]
    });
    fixture = TestBed.createComponent(MojeIdejeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
