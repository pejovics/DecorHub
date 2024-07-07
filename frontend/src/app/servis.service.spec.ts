import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './servis.service';
import { Role, User } from './models/User';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Proverava da li su svi očekivani HTTP zahtevi obrađeni
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  it('should handle unauthorized error', () => {
    const username = 'test';
    const password = 'password';

    authService.login(username, password).subscribe({
      next: () => fail('Expected an error, but received a successful response'),
      error: err => {
        expect(err.status).toBe(401);
        expect(err.error).toBe('Unauthorized');
      }
    });

    const req = httpTestingController.expectOne('http://localhost:4000/users/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' }); // Simulira neuspešan odgovor sa servera
  });

  it('should register with correct user', () => {
    const user: any = {
      username: 'test',
      password: 'test123',
      type: Role.KUPAC,
      email: 'test@test.com',
      phone: '+123123123',
      image: '/',
      company: 'testCompany'
    };

    authService.register(user).subscribe(response => {
      expect(response).toEqual({ response: 'User registered' }); // Proverava da li je vraćeni odgovor tačan
    });

    const req = httpTestingController.expectOne('http://localhost:4000/users/registracija');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ user: user });

    req.flush({ response: 'User registered' }); // Simulira uspešan odgovor sa servera
  });
});
