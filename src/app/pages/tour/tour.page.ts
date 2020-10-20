import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Spot } from '../../interfaces/spot.interface';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  spots: Spot[];

  constructor( private storage: StorageService ) { }

  ngOnInit() {
    this.getSpots();
  }

  async getSpots() {
   this.spots = await this.storage.all();
  }

}
