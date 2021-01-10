import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IFilm } from './pages/detail/detail.interface';

const routes = {
  all: () => '/films',
  byId: (id: number) => `/films/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private httpClient: HttpClient) {}

  getStarships(id: number): Observable<IFilm> {
    return this.httpClient.get(routes.byId(id)).pipe(
      map((body: any) => {
        return body;
      }),
      catchError(() => of('Error, could not found'))
    );
  }

  getAllStarships(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(
      map((body: any) => body.results),
      catchError(() => of('Error, could not found'))
    );
  }
}
