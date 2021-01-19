import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { PeopleService } from '../../people.service';
import { finalize } from 'rxjs/operators';
import { IPeople } from '../detail/detail.interface';
import { Subscription } from 'rxjs';

const log = new Logger('PeopleHomeComponent');

@Component({
  selector: 'app-people-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  peoples: IPeople[];
  isLoading = false;
  errorMsg: string;
  showError = false;
  private _subscription: Subscription;

  constructor(private _peopleService: PeopleService, private _router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this._subscription = this._peopleService
      .getAllPeople()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.peoples = data;
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
    this._router.navigate(['people/detail', ++count]);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
