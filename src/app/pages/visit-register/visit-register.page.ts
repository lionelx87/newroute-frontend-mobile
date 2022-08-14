import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { take } from "rxjs/operators";
import { Point } from "src/app/interfaces/geolocation.interface";
import { Spot } from "src/app/interfaces/spot.interface";
import { GeolocationService } from "src/app/services/geolocation.service";
import { MessageService } from "src/app/services/message.service";
import { SpotService } from "src/app/services/spot.service";
import { VisitService } from "src/app/services/visit.service";

@Component({
  selector: "app-visit-register",
  templateUrl: "./visit-register.page.html",
  styleUrls: ["./visit-register.page.scss"],
})
export class VisitRegisterPage implements OnInit {
  spots: Observable<Spot[]>;
  loading: boolean = false;

  // TODO: remote spot.disabled
  constructor(
    private spotService: SpotService,
    private geoService: GeolocationService,
    private visitService: VisitService,
    private route: Router,
    private msgService: MessageService
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

  // TODO: best approach
  get disabled(): boolean {
    if (this.spots !== undefined) {
      let disabled = false;
      this.spots
        .pipe(take(1))
        .subscribe(
          (spots) =>
            (disabled = spots
              .filter((spot) => !spot.disabled)
              .every((spot) => !spot.checked))
        );
      return disabled;
    }
  }

  register(): void {
    this.loading = true;
    this.spots.subscribe((spots) => {
      const visits: number[] = spots
        .filter((spot) => spot.checked && !spot.disabled)
        .map((spot) => spot.id);
      this.visitService.register(visits).subscribe( () => {
        this.loading = true;
        this.msgService.present("Visita Registrada!");
        this.route.navigate(["/"]);
      });
    });
  }
}
