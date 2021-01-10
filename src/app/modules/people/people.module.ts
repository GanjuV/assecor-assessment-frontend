import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { RoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@app/@shared';
import { CoreModule } from '@app/@core';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, RoutingModule],
  declarations: [PeopleComponent, HomeComponent, DetailComponent],
})
export class PeopleModule {}
