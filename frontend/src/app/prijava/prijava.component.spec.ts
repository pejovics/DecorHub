import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaComponent } from './prijava.component';
import { FormsModule, NgForm } from '@angular/forms';

describe('PrijavaComponent', () => {
  let component: PrijavaComponent;
  let fixture: ComponentFixture<PrijavaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavaComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should now allow login with invalid form', () => {
    const loginForm = <NgForm>{ invalid: true };

    spyOn(console, 'log');
    component.login(loginForm);

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should not allow login with empty string password', () => {
    const loginForm = <NgForm>{ invalid: false };

    const username = 'pejs';
    const password = '';

    spyOn(console, 'log');
    component.username = username;
    component.password = password;

    component.login(loginForm);

    expect(console.log).toHaveBeenCalledWith(
      'Password nije u skladu sa pravilima!'
    );
  });

  it('should not allow login with empty string username', () => {
    const loginForm = <NgForm>{ invalid: false };

    const username = '';
    const password = 'password123';

    spyOn(console, 'log');
    component.username = username;
    component.password = password;

    component.login(loginForm);

    expect(console.log).toHaveBeenCalledWith(
      'Username nije u skladu sa pravilima!'
    );
  });




});
