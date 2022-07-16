import { Observable, of } from 'rxjs';

export class FakeAuthenticationService {
  public loginWithUserCredentials(
    username: string,
    password: string
  ): Observable<any> {
    return of(null);
  }
}

export class FakePetsService {
  getPetsByStatus(): Observable<any> {
    return of(null);
  }

  createPet(id: string): Observable<any> {
    return of(null);
  }
}
