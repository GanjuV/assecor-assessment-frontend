import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Logger } from '@app/@core';
import { DialogSubscribeService } from '@app/@shared';
import { Subscription } from 'rxjs';
import { AddFilmFormService } from './add-film-form.service';

const log = new Logger('AddFilmComponent');

interface ISelectBox {
  label: string;
  value: string;
}

@Component({
  selector: 'app-add-film-home',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit, OnDestroy {
  filmForm: FormGroup;
  private _submitFormSubscription: Subscription;
  types: ISelectBox[] = [
    { label: 'Desert Planet', value: 'p1' },
    { label: 'Cold Planet', value: 'p2' },
    { label: 'Hot Planet', value: 'p3' },
  ];
  createdBy: ISelectBox[] = [
    { label: 'Desert Planet', value: 'p1' },
    { label: 'Cold Planet', value: 'p2' },
    { label: 'Hot Planet', value: 'p3' },
  ];
  constructor(
    private _addFilmFormService: AddFilmFormService,
    private _dialogSubscribeService: DialogSubscribeService
  ) {
    this.filmForm = this._addFilmFormService.form;

    this._submitFormSubscription = this._dialogSubscribeService.subscribeFormSubmit().subscribe((message) => {
      this.addFilm(this.filmForm.value);
    });
  }

  ngOnInit() {}

  addFilm(data: any) {
    if (this.filmForm.invalid) {
      this._addFilmFormService.validateAllFormFields(this.filmForm);
      return;
    }
    console.log(data);
    // TO POST Call
  }

  ngOnDestroy() {
    this.filmForm.reset();
    this._submitFormSubscription.unsubscribe();
  }
}
