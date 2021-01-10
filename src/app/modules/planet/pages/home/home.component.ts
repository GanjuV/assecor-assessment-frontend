import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { PlanetService } from '../../planet.service';
import { finalize } from 'rxjs/operators';
import { IPlanet } from '../detail/detail.interface';

const log = new Logger('HomeComponent');

@Component({
  selector: 'app-planet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  planets: IPlanet[];
  isLoading = false;

  constructor(private _planetService: PlanetService, private _router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this._planetService
      .getAllPlanets()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: IPlanet[]) => {
        this.planets = data;
      });
  }

  openDetailPage(item: any, count: number) {
    count += 2;
    this._router.navigate(['planet/detail', count], {
      replaceUrl: true,
    });
  }

  ngOnDestroy() {}
}
