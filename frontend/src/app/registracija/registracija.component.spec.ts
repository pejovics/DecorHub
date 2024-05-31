import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaComponent } from './registracija.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('RegistracijaComponent', () => {
  let component: RegistracijaComponent;
  let fixture: ComponentFixture<RegistracijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaComponent],
      imports: [ReactiveFormsModule,
        HttpClientModule
      ]
    });
    fixture = TestBed.createComponent(RegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not execute login if username is empty string',()=>{

      const registrationForm = <FormGroup> {}

  });

  it('should not execute login if password is empty string',()=>{

  });

  it('should create registration form with controls', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm instanceof FormGroup).toBe(true);
    expect(component.registrationForm.controls['username']).toBeDefined();
    expect(component.registrationForm.controls['email']).toBeDefined();
    expect(component.registrationForm.controls['password']).toBeDefined();
  });

  it('should have required validators', () => {
    const usernameControl = component.registrationForm.get('username');
    const emailControl = component.registrationForm.get('email');
    const passwordControl = component.registrationForm.get('password');

    expect(usernameControl?.hasError('required')).toBe(true);
    expect(emailControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);
  });

  it('should have minlength validator for username and password', () => {
    const usernameControl = component.registrationForm.get('username');
    const passwordControl = component.registrationForm.get('password');


    usernameControl?.setValue('ab'); // Set value with less than 3 characters
    passwordControl?.setValue('pass'); // Set value with less than 6 characters

    expect(usernameControl?.hasError('minlength')).toBe(true);
    expect(passwordControl?.hasError('minlength')).toBe(true);
  });

  it('should have email validator for email field', () => {
    const emailControl = component.registrationForm.get('email');

    emailControl?.setValue('invalid-email'); // Set invalid email
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@example.com'); // Set valid email
    expect(emailControl?.hasError('email')).toBe(false);
  });

  it('should call registracija method when form is valid', () => {
    spyOn(console, 'log');
    const formValue = {
      username: 'stefanp',
      email: 'stefan@pejovic.com',
      password: 'password123'
    };

    component.registrationForm.setValue(formValue);
    component.registracija();

    expect(console.log).toHaveBeenCalledWith('Uspesna registracija naloga sa username: ' + formValue.username);
  });

  it('should not call registracija method when form is invalid', () => {
    spyOn(console, 'log');

    // Form is invalid because it's empty
    component.registracija();

    expect(console.log).toHaveBeenCalledWith('Neuspesna registracija naloga sa username: ' + component.registrationForm.get('username')?.value);
  });


});
