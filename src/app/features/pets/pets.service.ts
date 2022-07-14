import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pet } from '@features/pets/models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private uri = 'http://localhost/v2';

  constructor(private http: HttpClient) {}

  public getPetsByStatus(status: string): Observable<any> {
    const URI = this.uri + '/pet/findByStatus';

    // const params = new HttpParams().set('status', 'available');
    // const status = ['available', 'pending', 'sold'];

    const params = status
      ? { params: new HttpParams().set('status', status) }
      : {};

    return this.http.get(URI, params).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public createPet(data: Pet): Observable<any> {
    const URI = this.uri + '/pet';

    return this.http.post(URI, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
