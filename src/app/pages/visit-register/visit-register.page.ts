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
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-visit-register",
  templateUrl: "./visit-register.page.html",
  styleUrls: ["./visit-register.page.scss"],
})
export class VisitRegisterPage implements OnInit {
  spots: Observable<Spot[]>;
  loading: boolean = false;
  getData: boolean = false;
  loader: HTMLIonLoadingElement;

  // TODO: remote spot.disabled
  constructor(
    private spotService: SpotService,
    private geoService: GeolocationService,
    private visitService: VisitService,
    private route: Router,
    private msgService: MessageService,
    private loadingCtrl: LoadingController
  ) {
    this.createLoading();
  }

  async ngOnInit() {
    this.spotService.getSpots().subscribe(async (spots) => {
      this.loader.present();
      await this.geoService.realPosition();
      this.getData = true;
      this.loader.dismiss();
      this.spots = of(
        spots
          .filter((spot) =>
            this.geoService.inProximity(
              this.geoService.haversineDistance({
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

  async createLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Buscando puntos turísticos...',
      spinner: 'circles',
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
        this.loading = false;
        this.msgService.present("Visita Registrada!");
        this.route.navigate(["/"]);
      });
    });
  }
}
