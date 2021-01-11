import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { IChips } from '@app/@shared/components/chips/chips.interface';
import { ChipDataService } from '@app/@shared/services';
import { IFilm } from '@app/modules/film/pages/detail/detail.interface';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PeopleService } from '../../people.service';
import { IPeople } from './detail.interface';

const log = new Logger('PeopleDetailComponent');

@Component({
  selector: 'app-people-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  isLoading = false;
  people: IPeople;
  films: IChips[] = [];
  ship: IChips[] = [];
  vehicles: IChips[] = [];
  errorMsg: string;
  showError = false;

  private _routeParamsSubscription: any;
  constructor(
    private _peopleService: PeopleService,
    private _chipService: ChipDataService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._getRouteId();
    this.getFilmData();
  }

  getFilmData() {
    this.isLoading = true;
    this._peopleService
      .getStarships(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.people = data;
          // films
          forkJoin(data.films.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
            ele.forEach((obj: IFilm) => {
              this.films.push({ name: obj.title });
            });
          });
          // ship
          forkJoin(data.starships.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
            ele.forEach((obj: any) => {
              this.ship.push({ name: obj.name });
            });
          });
          // character
          forkJoin(data.vehicles.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
            ele.forEach((obj: any) => {
              this.vehicles.push({ name: obj.name });
            });
          });
          log.info(data);
        },
        (err) => {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from swapi.dev API, please try later';
          log.error('Error: ' + err.message);
        }
      );
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
