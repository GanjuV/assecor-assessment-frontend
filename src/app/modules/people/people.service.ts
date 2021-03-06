import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      })
    );
  }

  getAllPeople(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(map((body: any) => body.results));
  }
}
