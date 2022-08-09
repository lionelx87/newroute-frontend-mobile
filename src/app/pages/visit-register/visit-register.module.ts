import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitRegisterPageRoutingModule } from './visit-register-routing.module';

import { VisitRegisterPage } from './visit-register.page';

import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    VisitRegisterPageRoutingModule
  ],
  declarations: [VisitRegisterPage]
})
export class VisitRegisterPageModule {}
