import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { RoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AddFilmComponent } from './pages/add-film/add-film.component';
import { AddFilmFormService } from './pages/add-film/add-film-form.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddFilmComponent, FilmComponent, HomeComponent, DetailComponent],
  providers: [AddFilmFormService],
})
export class FilmModule {}
