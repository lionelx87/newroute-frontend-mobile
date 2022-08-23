import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageModalPageRoutingModule } from './image-modal-routing.module';

import { ImageModalPage } from './image-modal.page';

import { SwiperModule } from 'swiper/angular';

import { PipesModule } from '../../pipes/pipes.module';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    PipesModule,
    TranslateModule,
    ImageModalPageRoutingModule
  ],
  declarations: [ImageModalPage]
})
export class ImageModalPageModule {}
