import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pet } from '@features/pets/models/pet.model';
import { URI_LOCALHOST, GET_PETS_BY_STATUS, CREATE_PET } from './http-const';

@Injectable({ providedIn: 'root' })
export class PetsService {
  constructor(private http: HttpClient) {}

  public getPetsByStatus(params: string[]): Observable<any> {
    const URL = URI_LOCALHOST + GET_PETS_BY_STATUS;

    return this.http.get(URL, { params: { status: params.join(',') } }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public createPet(data: Pet): Observable<any> {
    const URL = URI_LOCALHOST + CREATE_PET;

    return this.http.post(URL, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
