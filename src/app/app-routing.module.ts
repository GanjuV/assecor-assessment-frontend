import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AppHomeComponent } from './modules/app-home/app-home.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'star-wars', component: AppHomeComponent, data: { title: 'Star Wars' } },
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]),
  { path: 'film', loadChildren: () => import('./modules/film/film.module').then((m) => m.FilmModule) },
  { path: 'people', loadChildren: () => import('./modules/people/people.module').then((m) => m.PeopleModule) },
  { path: 'planet', loadChildren: () => import('./modules/planet/planet.module').then((m) => m.PlanetModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
