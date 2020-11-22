import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Mode } from 'src/assets/priority';
import { Spot } from '../../interfaces/spot.interface';

import { StorageService } from '../../services/storage.service';
import { MapPage } from '../map/map.page';
import { AuthService } from '../../services/auth.service';
import { SpotService } from '../../services/spot.service';


@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
})
export class SpotPage implements OnInit {

  @Input() spot: Spot;

  options = { isRecommended: false };

  loading = false;

  get userLogged() { return this.auth.isLogin(); }

  get checkRecommended() { return this.options.isRecommended ? 'primary' : 'light'; }

  constructor( private modalCtrl: ModalController,
               private storage: StorageService,
               private auth: AuthService,
               private spotService: SpotService
  ) { }

  ngOnInit() {
    if(this.userLogged) {
      this.checkOptions();
    }
  }

  async checkOptions() {
    this.loading = true;
    this.spotService.check(this.spot)
      .subscribe( (resp: any) => {
        this.options.isRecommended = resp.recommended;
        this.loading = false;
      });
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  addToTour() {
    this.storage.store(this.spot);
  }

  recommend() {
    this.options.isRecommended = !this.options.isRecommended;
    this.spotService.recommend(this.spot).subscribe();
  }

  async viewMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: {
        spots: [this.spot],
        mode: Mode.BY_PROXIMITY
      }
    });
    return await modal.present();
  }

}
