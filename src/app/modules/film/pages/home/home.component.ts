import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { FilmService } from '../../film.service';
import { finalize } from 'rxjs/operators';

const log = new Logger('homeComponent');

@Component({
  selector: 'app-film-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  films: Array<any>;
  isLoading = false;
  errorMsg: string;
  showError = false;
  constructor(private _filmService: FilmService, private _router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this._filmService
      .getAllFilms()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next(data) {
          this.showError = false;
          this.films = data;
        },
        error(err) {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from swapi.dev API, please try later';
          console.log(this.showError);
          console.error('Error: ' + err.message);
        },
      });
  }

  openDetailPage(item: any, count: number) {
    count += 2;
    this._router.navigate(['film/detail', count], {
      replaceUrl: true,
    });
  }

  ngOnDestroy() {}
}
