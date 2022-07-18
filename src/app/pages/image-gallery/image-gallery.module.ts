import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageGalleryPageRoutingModule } from './image-gallery-routing.module';

import { ImageGalleryPage } from './image-gallery.page';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    PipesModule,
    ImageGalleryPageRoutingModule
  ],
  declarations: [ImageGalleryPage]
})
export class ImageGalleryPageModule {}
