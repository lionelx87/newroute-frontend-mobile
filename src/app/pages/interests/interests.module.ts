import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterestsPageRoutingModule } from './interests-routing.module';

import { InterestsPage } from './interests.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InterestsPageRoutingModule
  ],
  declarations: [InterestsPage]
})
export class InterestsPageModule {}
