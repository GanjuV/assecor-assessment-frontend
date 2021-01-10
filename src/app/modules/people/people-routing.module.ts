import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { PeopleComponent } from './people.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  Shell.childRoutes([
    {
      path: 'people',
      component: PeopleComponent,
      children: [
        { path: '', component: HomeComponent, data: { title: extract('People') } },
        { path: 'detail/:id', component: DetailComponent, data: { title: extract('People Detail') } },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RoutingModule {}
