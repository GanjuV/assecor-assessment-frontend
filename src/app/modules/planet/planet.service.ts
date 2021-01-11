import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlanet } from './pages/detail/detail.interface';

const routes = {
  all: () => '/planets',
  byId: (id: number) => `/planets/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor(private httpClient: HttpClient) {}

  getStarships(id: number): Observable<IPlanet> {
    return this.httpClient.get(routes.byId(id)).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getAllPlanets(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(map((body: any) => body.results));
  }
}
