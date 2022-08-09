import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitRegisterPage } from './visit-register.page';

const routes: Routes = [
  {
    path: '',
    component: VisitRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitRegisterPageRoutingModule {}
