import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IPeople } from './pages/detail/detail.interface';

const routes = {
  all: () => '/people',
  byId: (id: number) => `/people/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private httpClient: HttpClient) {}

  getStarships(id: number): Observable<IPeople> {
    return this.httpClient.get(routes.byId(id)).pipe(
      map((body: any) => {
        return body;
      }),
      catchError(() => of('Error, with network'))
    );
  }

  getAllPeople(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(
      map((body: any) => body.results),
      catchError(() => of('Error, with network'))
    );
  }
}
