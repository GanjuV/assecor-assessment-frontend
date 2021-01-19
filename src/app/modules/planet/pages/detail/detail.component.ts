import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { IChips } from '@app/@shared/components/chips/chips.interface';
import { ChipDataService } from '@app/@shared/services';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PlanetService } from '../../planet.service';
import { IPlanet } from './detail.interface';

const log = new Logger('PlanetDetailComponent');

@Component({
  selector: 'app-planet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  isLoading = false;
  planet: IPlanet;
  residents: IChips[] = [];
  films: IChips[] = [];
  errorMsg: string;
  showError = false;
  private _subscription: Subscription;

  private _routeParamsSubscription: any;
  constructor(
    private _planetService: PlanetService,
    private _chipService: ChipDataService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._getRouteId();
    this.getFilmData();
  }

  getFilmData() {
    this.isLoading = true;
    this._subscription = this._planetService
      .getStarships(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.planet = data;
          // residents
          forkJoin(data.residents.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
            this.getData(ele, 'name', this.residents);
          });
          // films
          forkJoin(data.films.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
            this.getData(ele, 'title', this.films);
          });
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
