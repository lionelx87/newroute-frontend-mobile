import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Mode } from 'src/assets/priority';
import { Spot } from '../../interfaces/spot.interface';

import { StorageService } from '../../services/storage.service';
import { MapPage } from '../map/map.page';
import { AuthService } from '../../services/auth.service';
import { SpotService } from '../../services/spot.service';
import { ValorationComponent } from '../../components/valoration/valoration.component';
import { CommentsPage } from '../comments/comments.page';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
})
export class SpotPage implements OnInit {

  @Input() spot: Spot;

  opinions = { isRecommended: false, rating: 0 };

  loading = false;

  get userLogged() { return this.auth.isLogin(); }

  get checkRecommended() { return this.opinions.isRecommended ? 'primary' : 'light'; }

  get checkRate() { return this.opinions.rating === 0 ? 'star-outline' : 'star'; }

  constructor( private modalCtrl: ModalController,
               private storage: StorageService,
               private auth: AuthService,
               private spotService: SpotService,
               private popCtrl: PopoverController,
               private messageService: MessageService
  ) { }

  ngOnInit() {
    if(this.userLogged) {
      this.checkopinions();
    }
  }

  async checkopinions() {
    this.loading = true;
    this.spotService.getOpinions(this.spot)
      .subscribe( (resp: any) => {
        this.opinions.isRecommended = resp.recommended;
        this.opinions.rating = resp.valoration;
        this.loading = false;
      });
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  async addToTour() {
    await this.storage.store(this.spot);
    this.messageService.present('Se agrego correctamente a su recorrido.');
  }

  recommend() {
    this.opinions.isRecommended = !this.opinions.isRecommended;
    this.spotService.recommend(this.spot).subscribe();
  }

  async rate(ev: any) {
    const popover = await this.popCtrl.create({
      component: ValorationComponent,
      componentProps: {
        spot: this.spot,
        rating: this.opinions.rating
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

  async openComments() {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      componentProps: {
        spot: this.spot
      }
    });
    return await modal.present();
  }

}
