import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Spot } from '../../interfaces/spot.interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  spots: Spot[];

  constructor( private storage: StorageService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.getSpots();
  }

  async getSpots() {
   this.spots = await this.storage.all();
  }

  toCategories() {
    // this.router.navigateByUrl('/categories', { replaceUrl: true });
    this.router.navigateByUrl('/categories');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.getSpots();
  }

}
