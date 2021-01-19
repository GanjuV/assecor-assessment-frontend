import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ShellModule } from './shell/shell.module';
import { AppHomeModule } from './modules/app-home/app-home.module';
import { FilmModule } from './modules/film/film.module';
import { PeopleModule } from './modules/people/people.module';
import { SharedModule } from './@shared';
import { PlanetModule } from './modules/planet/planet.module';
import { AddFilmComponent } from './modules/film/pages/add-film/add-film.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    FilmModule,
    PeopleModule,
    PlanetModule,
    AppHomeModule,
    AppRoutingModule,
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
