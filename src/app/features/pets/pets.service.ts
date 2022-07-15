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

  public getPetsByStatus(statusList: string[]): Observable<any> {
    const URI = this.uri + '/pet/findByStatus';

    return this.http
      .get(URI, { params: { status: statusList.join(',') } })
      .pipe(
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
