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
  quote: string | undefined;
  films: Array<any>;
  isLoading = false;

  constructor(private _filmService: FilmService, private _router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this._filmService
      .getAllStarships()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.films = data;
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
