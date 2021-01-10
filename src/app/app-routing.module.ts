import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'film', loadChildren: () => import('./modules/film/film.module').then((m) => m.FilmModule) },
    { path: 'people', loadChildren: () => import('./modules/people/people.module').then((m) => m.PeopleModule) },
    { path: 'planet', loadChildren: () => import('./modules/planet/planet.module').then((m) => m.PlanetModule) },
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
