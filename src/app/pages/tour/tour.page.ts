import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Spot } from '../../interfaces/spot.interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { priorityText, Priority } from '../../../assets/priority';


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
    this.router.navigateByUrl('/categories');
  }

  async presentAlert(spot: Spot) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Seleccione prioridad',
      message: 'This is an alert message.',
      inputs: [
        {
          name: 'radio',
          type: 'radio',
          label: 'Normal',
          value: Priority.NORMAL,
          checked: spot.priority.value === Priority.NORMAL ? true : false
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Deseable',
          value: Priority.HIGH,
          checked: spot.priority.value === Priority.HIGH ? true : false
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Muy Deseable',
          value: Priority.VERY_HIGH,
          checked: spot.priority.value === Priority.VERY_HIGH ? true : false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (value) => {
            spot.priority.value = value;
            this.storage.update(spot);
          }
        }
      ]
    });

    await alert.present();
  }

  getPriorityText(value: number) {
    return priorityText(value);
  }

  ionViewWillEnter() {
    this.getSpots();
  }

}
