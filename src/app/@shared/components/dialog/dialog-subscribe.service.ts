import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class DialogSubscribeService {
  private subject = new Subject<any>();

  constructor() {}

  submitForm() {
    this.subject.next();
  }

  subscribeFormSubmit(): Observable<any> {
    return this.subject.asObservable();
  }
}
