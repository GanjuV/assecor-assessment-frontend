import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FilmService } from './film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
