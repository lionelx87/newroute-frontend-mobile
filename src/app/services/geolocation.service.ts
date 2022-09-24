import { ElementRef, Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { environment } from "../../environments/environment";
import { Spot } from "../interfaces/spot.interface";
import { Point } from "../interfaces/geolocation.interface";
import { VISIT } from "../constants/geolocation.constants";

const { Geolocation } = Plugins;

declare var google;

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  mapRef: ElementRef;
  position = null;
  map = google.maps.Map;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor() {
    // this.realPosition();
  }

   async realPosition() {
    const rta = await Geolocation.getCurrentPosition();
    this.position = new google.maps.LatLng(
      rta.coords.latitude,
      rta.coords.longitude
    );
  }

  setMapRef(mapRef: ElementRef) {
    this.mapRef = mapRef;
  }

  setPosition(position: Point) {
    this.position = new google.maps.LatLng(position.lat, position.lng);
  }

  initMap(zoom: number): void {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: this.position,
      zoom,
    });
  }

  renderPosition() {
    google.maps.event.addListenerOnce(this.map, "idle", () => {
      const marker = new google.maps.Marker({
        position: this.position,
        zoom: 16,
        map: this.map,
        icon: environment.icon_person,
        title: "Probando mapa",
      });
    });
  }

  renderRoute(spots: Spot[], optimizedRoute: boolean): void {
    this.directionsDisplay.setMap(this.map);

    const destinyNode = spots.pop();
    const destiny = new google.maps.LatLng(
      destinyNode.latitude,
      destinyNode.longitude
    );

    const wayPoints = [];
    spots.forEach((spot) => {
      wayPoints.push({
        location: new google.maps.LatLng(spot.latitude, spot.longitude),
        stopover: true,
      });
    });

    this.directionsService.route(
      {
        origin: this.position,
        destination: destiny,
        waypoints: wayPoints,
        optimizeWaypoints: optimizedRoute,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert("Error: " + status);
        }
      }
    );
  }

  haversineDistance(origin: Point, destiny: Point): number {
    const R = 3958.8;
    const rlat1 = origin.lat * (Math.PI / 180);
    const rlat2 = destiny.lat * (Math.PI / 180);
    const difflat = rlat2 - rlat1;
    const difflon = (destiny.lng - origin.lng) * (Math.PI / 180);
    const distance =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    const km = distance * 1.609;
    return km;
  }

  inProximity(distance: number): boolean {
    return distance <= VISIT.DISTANCE_MINIMUM;
  }

}
