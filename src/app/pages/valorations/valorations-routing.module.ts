import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValorationsPage } from './valorations.page';

const routes: Routes = [
  {
    path: '',
    component: ValorationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValorationsPageRoutingModule {}
