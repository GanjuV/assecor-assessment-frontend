import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from './i18n';
import { AppHomeComponent } from './modules/app-home/app-home.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'film', loadChildren: () => import('./modules/film/film.module').then((m) => m.FilmModule) },
    { path: 'people', loadChildren: () => import('./modules/people/people.module').then((m) => m.PeopleModule) },
    { path: 'planet', loadChildren: () => import('./modules/planet/planet.module').then((m) => m.PlanetModule) },
    { path: 'star-wars', component: AppHomeComponent, data: { title: extract('Star Wars') } },
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })],
  // imports: [],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
