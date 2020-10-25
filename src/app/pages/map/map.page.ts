import { Mode } from './../../../assets/priority';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';
import { GeolocationService } from '../../services/geolocation.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @Input() spots: Spot[];
  @Input() mode: number;

  @ViewChild('map') mapRef: ElementRef;


  constructor( private geolocation: GeolocationService ) { }

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

    this.geolocation.renderRoute(this.spots);
  }

  sortByPriority(): void {
    this.spots.sort( (a, b) => b.priority.value - a.priority.value );
  }

  sortByProximity(): void {
    
  }

}
