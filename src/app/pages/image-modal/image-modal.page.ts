import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Zoom } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([ Zoom ])

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @Input() img: string;
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    zoom: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  zoom(zoomIn) {
    const zoom = this.swiper.swiperRef.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
