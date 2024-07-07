import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdejaKarticaComponent } from './ideja-kartica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IdejaKarticaComponent', () => {
  let component: IdejaKarticaComponent;
  let fixture: ComponentFixture<IdejaKarticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdejaKarticaComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(IdejaKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
