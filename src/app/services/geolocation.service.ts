import { ElementRef, Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { Spot } from '../interfaces/spot.interface';

const { Geolocation } = Plugins;

declare var google;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  mapRef: ElementRef;
  position = null;
  map = google.maps.Map;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor() {
    this.realPosition();
  }

  private async realPosition() {
    const rta = await Geolocation.getCurrentPosition();
    this.position = new google.maps.LatLng(rta.coords.latitude, rta.coords.longitude);
  }

  setMapRef(mapRef: ElementRef) {
    this.mapRef = mapRef;
  }

  setPosition(position: { lat: number, lng: number }) {
    this.position = new google.maps.LatLng(position.lat, position.lng);
  }

  initMap(zoom: number): void {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: this.position,
      zoom
    });
  }

  renderPosition() {
    google.maps.event
      .addListenerOnce(this.map, 'idle', () => {
        const marker = new google.maps.Marker({
          position: this.position,
          zoom: 16,
          map: this.map,
          icon: environment.icon_person,
          title: 'Probando mapa'
        });
      });
  }

  renderRoute(spots: Spot[], optimizedRoute: boolean): void {
    this.directionsDisplay.setMap(this.map);

    const destinyNode = spots.pop();
    const destiny = new google.maps.LatLng(destinyNode.latitude, destinyNode.longitude);

    const wayPoints = [];
    spots.forEach( spot => {
      wayPoints.push({
        location: new google.maps.LatLng(spot.latitude, spot.longitude),
        stopover: true
      });
    });

    this.directionsService.route({
      origin: this.position,
      destination: destiny,
      waypoints: wayPoints,
      optimizeWaypoints: optimizedRoute,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if(status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Error: ' + status);
      }
    });

  }













}
