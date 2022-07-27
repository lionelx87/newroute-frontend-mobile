import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterestsPage } from './interests.page';

const routes: Routes = [
  {
    path: '',
    component: InterestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterestsPageRoutingModule {}
