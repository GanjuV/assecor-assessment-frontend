import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { PlanetRoutingModule } from './planet-routing.module';
import { PlanetComponent } from './planet.component';
import { CoreModule } from '@app/@core';
import { SharedModule } from '@app/@shared';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PlanetRoutingModule,
  ],
  declarations: [PlanetComponent, HomeComponent, DetailComponent],
})
export class PlanetModule {}
