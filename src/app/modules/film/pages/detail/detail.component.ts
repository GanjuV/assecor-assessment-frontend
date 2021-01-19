import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { IChips } from '@app/@shared/components/chips/chips.interface';
import { ChipDataService } from '@app/@shared/services';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FilmService } from '../../film.service';
import { IFilm } from './detail.interface';

const log = new Logger('FilmDetailComponent');

@Component({
  selector: 'app-film-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  isLoading = false;
  film: IFilm;
  character: IChips[] = [];
  planet: IChips[] = [];
  ship: IChips[] = [];
  species: IChips[] = [];
  errorMsg: string;
  showError = false;
  private _subscription: Subscription;
  private _routeParamsSubscription: any;
  constructor(
    private _filmService: FilmService,
    private _chipService: ChipDataService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._getRouteId();
    this.getFilmData();
  }

  getFilmData() {
    this.isLoading = true;
    this._subscription = this._filmService
      .getFilm(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.film = data;
          log.info(data);

          forkJoin(data.characters.map((ele) => this.getChipData(ele))).subscribe((ele: any) =>
            this.getData(ele, 'name', this.character)
          );
          // planet
          forkJoin(data.planets.map((ele) => this.getChipData(ele))).subscribe((ele: any) =>
            this.getData(ele, 'name', this.planet)
          );
          // ship
          forkJoin(data.starships.map((ele) => this.getChipData(ele))).subscribe((ele: any) =>
            this.getData(ele, 'name', this.ship)
          );
          // character
          forkJoin(data.species.map((ele) => this.getChipData(ele))).subscribe((ele: any) =>
            this.getData(ele, 'name', this.species)
          );
        },
        (err) => {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from swapi.dev API, please try later';
          log.error('Error: ' + err.message);
        }
      );
  }

  getData(dataObj: any, key: string, arry: any) {
    dataObj.forEach((obj: any) => {
      arry.push({ name: obj[key] });
    });
  }

  getChipData(url: string) {
    return this._chipService.getData(url);
  }

  private _getRouteId() {
    this._routeParamsSubscription = this._route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnDestroy() {
    this._routeParamsSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }
}
