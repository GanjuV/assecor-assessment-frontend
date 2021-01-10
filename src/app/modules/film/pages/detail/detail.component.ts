import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { IChips } from '@app/@shared/components/chips/chips.interface';
import { ChipDataService } from '@app/@shared/services';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FilmService } from '../../film.service';
import { IFilm } from './detail.interface';

const log = new Logger('DetailComponent');

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
    this._filmService
      .getFilm(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: IFilm) => {
        this.film = data;

        // character
        forkJoin(data.characters.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.character.push({ name: obj.name });
          });
        });
        // planet
        forkJoin(data.planets.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.planet.push({ name: obj.name });
          });
        });
        // ship
        forkJoin(data.starships.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.ship.push({ name: obj.name });
          });
        });
        // character
        forkJoin(data.species.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.species.push({ name: obj.name });
          });
        });
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
  }
}
