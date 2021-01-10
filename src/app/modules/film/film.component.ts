import { Component, OnInit } from '@angular/core';
import { DialogData, DialogService } from '@app/@shared';
import { AddFilmComponent } from './pages/add-film/add-film.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  constructor(private _dialogService: DialogService) {}

  ngOnInit() {}

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
}
