import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  openPreview() {
    
  }

  close() {
    this.modalCtrl.dismiss();
   }

}
