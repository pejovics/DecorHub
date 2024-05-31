import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './servis.service';
import { User } from './models/User';

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

  it('should send login request', () => {
    const mockUser: User = { id: 1, username: 'test_user', password:"password123", email: 'test@example.com' };
    const username = 'test';
    const password = 'password';

    authService.login(username, password).subscribe(user => {
      expect(user).toEqual(mockUser); // Proverava da li je vraćeni korisnik isti kao mockUser
    });

    const req = httpTestingController.expectOne('http://example.com/api/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(mockUser); // Simulira uspešan odgovor sa servera
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

    const req = httpTestingController.expectOne('http://example.com/api/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' }); // Simulira neuspešan odgovor sa servera
  });


  it('should register with correct user', () => {
    const user: User = { id: 1, username: 'test_user', password:"password123", email: 'test@example.com' };

    authService.register(user.username, user.password).subscribe(resp => {
      expect(resp).toEqual({response:"User registered"}); // Proverava da li je vraćeni korisnik isti kao mockUser
    });

    const req = httpTestingController.expectOne('http://example.com/api/register');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username:user.username, password:user.password });

    req.flush({response:"User registered"}); // Simulira uspešan odgovor sa servera
  });



  // Dodaj više testova za greške, npr. kada server vraća grešku 401 Unauthorized
});
