import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Mode } from 'src/assets/priority';
import { Spot } from '../../interfaces/spot.interface';

import { StorageService } from '../../services/storage.service';
import { MapPage } from '../map/map.page';
import { AuthService } from '../../services/auth.service';
import { SpotService } from '../../services/spot.service';
import { ValorationComponent } from '../../components/valoration/valoration.component';


@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
})
export class SpotPage implements OnInit {

  @Input() spot: Spot;

  options = { isRecommended: false, rating: 0 };

  loading = false;

  get userLogged() { return this.auth.isLogin(); }

  get checkRecommended() { return this.options.isRecommended ? 'primary' : 'light'; }

  get checkRate() { return this.options.rating === 0 ? 'star-outline' : 'star'; }

  constructor( private modalCtrl: ModalController,
               private storage: StorageService,
               private auth: AuthService,
               private spotService: SpotService,
               private popCtrl: PopoverController
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
        this.options.rating = resp.valoration;
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

  async rate(ev: any) {
    const popover = await this.popCtrl.create({
      component: ValorationComponent,
      componentProps: {
        spot: this.spot,
        rating: this.options.rating
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
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
