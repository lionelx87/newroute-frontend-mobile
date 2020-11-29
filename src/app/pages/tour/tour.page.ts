import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Spot } from '../../interfaces/spot.interface';
import { Router } from '@angular/router';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { priorityText, Priority, Mode } from '../../../assets/priority';
import { MapPage } from '../map/map.page';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  spots: Spot[] = [];

  @ViewChild(IonList) ionList: IonList;

  get empty() { return this.spots.length <= 0; }

  constructor( private storage: StorageService,
               private router: Router,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.getSpots();
  }

  async getSpots() {
   this.spots = await this.storage.all();
  }

  toCategories() {
    this.router.navigateByUrl('/categories');
  }

  async changePriority(spot: Spot) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Seleccione prioridad',
      message: spot.name,
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

  delete(spot: Spot) {
    this.ionList.closeSlidingItems();
    this.storage.delete(spot);
    this.spots = this.spots.filter(s => s.id !== spot.id);
  }

  async selectMode() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Modo de Recorrido',
      inputs: [
        {
          name: 'radio',
          type: 'radio',
          label: 'Por Prioridad',
          value: Mode.BY_PRIORITY,
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Por Proximidad',
          value: Mode.BY_PROXIMITY,
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Comenzar',
          handler: async (value) => {
            const modal = await this.modalCtrl.create({
              component: MapPage,
              componentProps: {
                spots: this.spots,
                mode: value
              }
            });
            await modal.present();
            this.getSpots();
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.getSpots();
  }

}
