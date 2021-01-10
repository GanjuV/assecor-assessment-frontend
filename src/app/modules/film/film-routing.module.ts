import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { FilmComponent } from './film.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/film', pathMatch: 'full' },
    {
      path: 'film',
      component: FilmComponent,
      children: [
        { path: '', component: HomeComponent, data: { title: extract('Film') } },
        { path: 'detail/:id', component: DetailComponent, data: { title: extract('Film Detail') } },
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
