import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { FilmService } from '../../film.service';
import { finalize } from 'rxjs/operators';
import { IFilm } from '../detail/detail.interface';
import { AddFilmComponent } from '../add-film/add-film.component';
import { DialogData, DialogService } from '@app/@shared';

const log = new Logger('FilmHomeComponent');

@Component({
  selector: 'app-film-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  films: IFilm[];
  isLoading = false;
  errorMsg: string;
  showError = false;
  constructor(private _filmService: FilmService, private _router: Router, private _dialogService: DialogService) {}

  ngOnInit() {
    this.isLoading = true;
    this._filmService
      .getAllFilms()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.films = data;
          console.log(data);
          log.info(data);
        },
        (err) => {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from swapi.dev API, please try later';
          log.error('Error: ' + err.message);
        }
      );
  }

  openDetailPage(item: any, count: number) {
    count += 2;
    this._router.navigate(['film/detail', count], {
      replaceUrl: true,
    });
  }

  openDialog() {
    const data: DialogData = {
      component: AddFilmComponent,
      displayConfig: {
        title: 'Add Film',
        buttons: {
          secondary: {
            label: 'Cancel',
          },
          primary: {
            label: 'Add Film',
          },
        },
      },
    };
    this._dialogService.open(data, true);
  }

  ngOnDestroy() {}
}
