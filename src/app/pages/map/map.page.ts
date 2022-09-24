import { Mode } from './../../../assets/priority';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';
import { GeolocationService } from '../../services/geolocation.service';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @Input() spots: Spot[];
  @Input() mode: number;

  @ViewChild('map') mapRef: ElementRef;
  optimizedRoute: boolean;

  loading: HTMLIonLoadingElement;

  constructor( 
    private geolocation: GeolocationService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { 
    this.optimizedRoute = true; 
    this.createLoading();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async createLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Calculando recorrido...',
      spinner: 'circles',
    });
  }

  async loadMap() {
    this.geolocation.setMapRef(this.mapRef);
    this.loading.present();
    await this.geolocation.realPosition();
    this.loading.dismiss();
    this.geolocation.initMap(16);

    this.mode === Mode.BY_PRIORITY ? this.sortByPriority() : this.sortByProximity();

    this.geolocation.renderRoute(this.spots, this.optimizedRoute);
  }

  sortByPriority(): void {
    this.spots.sort( (a, b) => b.priority.value - a.priority.value );
    this.optimizedRoute = false;
  }

  sortByProximity() {
    this.optimizedRoute = true;
  }

  close() {
   this.modalCtrl.dismiss();
  }

}
