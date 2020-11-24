import { Mode } from './../../../assets/priority';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';
import { GeolocationService } from '../../services/geolocation.service';
import { ModalController } from '@ionic/angular';


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


  constructor( 
    private geolocation: GeolocationService,
    private modalCtrl: ModalController
  ) { this.optimizedRoute = true; }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    this.geolocation.setMapRef(this.mapRef);
    this.geolocation.setPosition({ lat: -46.453193, lng: -67.529532 });
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
