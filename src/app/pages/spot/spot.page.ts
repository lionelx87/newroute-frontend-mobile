import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Spot } from '../../interfaces/spot.interface';

import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
})
export class SpotPage implements OnInit {

  @Input() spot: Spot;

  constructor( private modalCtrl: ModalController,
               private storage: StorageService) { }

  ngOnInit() {
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  addToTour() {
    this.storage.store(this.spot);
  }

  recommend() { console.log('recommend...'); }

}
