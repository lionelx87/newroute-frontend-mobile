import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { SwiperOptions } from 'swiper';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openPreview(img) {
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
      cssClass: 'transparent-modal'
    });
    modal.present();
  }

  close() {
    this.modalCtrl.dismiss();
   }

}
