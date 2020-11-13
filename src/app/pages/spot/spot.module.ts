import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpotPageRoutingModule } from './spot-routing.module';

import { SpotPage } from './spot.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SpotPageRoutingModule
  ],
  declarations: [SpotPage]
})
export class SpotPageModule {}
