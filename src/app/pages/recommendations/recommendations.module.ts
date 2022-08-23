import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommendations-routing.module';

import { RecommendationsPage } from './recommendations.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    TranslateModule,
    RecommendationsPageRoutingModule
  ],
  declarations: [RecommendationsPage]
})
export class RecommendationsPageModule {}
