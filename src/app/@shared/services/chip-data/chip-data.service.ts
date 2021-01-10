import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetURL } from '@app/@shared/utilities/util';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  data: (url: string) => `/${url}`,
};

@Injectable()
export class ChipDataService {
  constructor(private httpClient: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.httpClient.get(routes.data(GetURL(url))).pipe(
      map((body: any) => {
        return body;
      }),
      catchError(() => of('Error, with network'))
    );
  }
}
