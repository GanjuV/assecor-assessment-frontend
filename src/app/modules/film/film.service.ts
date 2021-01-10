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

  getFilm(id: number): Observable<IFilm> {
    return this.httpClient.get(routes.byId(id)).pipe(
      map((body: any) => {
        return body;
      }),
      catchError(() => of('Error, with network'))
    );
  }

  getAllFilms(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(
      map((body: any) => body.results)
      // ,
      // catchError((err) => of('Error, with network', err.message))
    );
  }
}
