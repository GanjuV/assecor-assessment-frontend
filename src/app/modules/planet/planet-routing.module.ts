import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanetComponent } from './planet.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  Shell.childRoutes([
    {
      path: 'planet',
      component: PlanetComponent,
      children: [
        { path: '', component: HomeComponent, data: { title: 'Planet' } },
        { path: 'detail/:id', component: DetailComponent, data: { title: 'Planet Detail' } },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PlanetRoutingModule {}
