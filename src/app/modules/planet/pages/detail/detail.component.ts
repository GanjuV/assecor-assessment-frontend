import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { IChips } from '@app/@shared/components/chips/chips.interface';
import { ChipDataService } from '@app/@shared/services';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PlanetService } from '../../planet.service';
import { IPlanet } from './detail.interface';

const log = new Logger('DetailComponent');

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
    this._planetService
      .getStarships(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: IPlanet) => {
        this.planet = data;
        // residents
        forkJoin(data.residents.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.residents.push({ name: obj.name });
          });
        });
        // films
        console.log(data.films, data.residents);
        forkJoin(data.films.map((ele) => this.getChipData(ele))).subscribe((ele: any) => {
          ele.forEach((obj: any) => {
            this.films.push({ name: obj.title });
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
