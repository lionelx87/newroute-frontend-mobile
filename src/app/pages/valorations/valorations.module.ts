import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValorationsPageRoutingModule } from './valorations-routing.module';

import { ValorationsPage } from './valorations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValorationsPageRoutingModule
  ],
  declarations: [ValorationsPage]
})
export class ValorationsPageModule {}
