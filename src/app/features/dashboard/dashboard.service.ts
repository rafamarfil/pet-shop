import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private uri = 'http://localhost/v2';

  constructor(private http: HttpClient) {}

  public getPets(status: string): Observable<any> {
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
}
