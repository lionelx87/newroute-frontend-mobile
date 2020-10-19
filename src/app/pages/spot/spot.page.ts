import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Spot } from '../../interfaces/spot.interface';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
})
export class SpotPage implements OnInit {

  @Input() spot: Spot;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    console.log(this.spot);
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  addTour() {
    // Agreagr al Storage
    console.log(this.spot);
  }

}
