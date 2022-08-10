import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Point } from "src/app/interfaces/geolocation.interface";
import { Spot } from "src/app/interfaces/spot.interface";
import { GeolocationService } from "src/app/services/geolocation.service";
import { SpotService } from "src/app/services/spot.service";

@Component({
  selector: "app-visit-register",
  templateUrl: "./visit-register.page.html",
  styleUrls: ["./visit-register.page.scss"],
})
export class VisitRegisterPage implements OnInit {
  spots: Observable<Spot[]>;

  constructor(
    private spotService: SpotService,
    private geoService: GeolocationService
  ) {}

  async ngOnInit() {
    this.spotService.getSpots().subscribe((spots) => {
      // location spoofing
      const myPosition: Point = { lat: -46.453193, lng: -67.529532 };
      this.spots = of(
        spots
          .filter((spot) =>
            this.geoService.inProximity(
              this.geoService.haversineDistance(myPosition, {
                lat: Number(spot.latitude),
                lng: Number(spot.longitude),
              })
            )
          )
          .map((spot) => {
            spot.disabled = false;
            spot.checked = false;
            return spot;
          })
      );
    });
  }

  register(): void {
    this.spots.subscribe((spots) => {
      const spotsToRegister: number[] = spots
        .filter((spot) => spot.checked && !spot.disabled)
        .map((spot) => spot.id);
      console.log(spotsToRegister);
    });
  }
}
