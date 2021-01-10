import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable()
export class AddFilmFormService {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      type: [null],
      genre: [null, Validators.required],
      createdBy: [null, Validators.required],
      races: [null, Validators.maxLength(30)],
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const _control = formGroup.get(field);
      if (_control instanceof FormControl) {
        _control.markAsTouched({ onlySelf: true });
      } else if (_control instanceof FormGroup) {
        this.validateAllFormFields(_control);
      }
    });
  }
}
