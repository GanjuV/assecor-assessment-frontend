import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { PeopleService } from '../../people.service';
import { finalize } from 'rxjs/operators';
import { IPeople } from '../detail/detail.interface';

const log = new Logger('homeComponent');

@Component({
  selector: 'app-people-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  peoples: IPeople[];
  isLoading = false;

  constructor(private _peopleService: PeopleService, private _router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this._peopleService
      .getAllPeople()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.peoples = data;
      });
  }

  openDetailPage(item: any, count: number) {
    count += 2;
    this._router.navigate(['people/detail', count], {
      replaceUrl: true,
    });
  }

  ngOnDestroy() {}
}
