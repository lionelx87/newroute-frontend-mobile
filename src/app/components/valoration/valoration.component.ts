import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Spot } from '../../interfaces/spot.interface';
import { SpotService } from '../../services/spot.service';

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.scss'],
})
export class ValorationComponent implements OnInit {

  @Input() spot: Spot;
  @Input() rating: number;

  itemsValoration =  [
    { index: 0, value: 1, icon: 'star-outline' },
    { index: 1, value: 2, icon: 'star-outline' },
    { index: 2, value: 3, icon: 'star-outline' },
    { index: 3, value: 4, icon: 'star-outline' },
    { index: 4, value: 5, icon: 'star-outline' },
  ];

  valoration: number;

  constructor(
    private spotService: SpotService,
    private popCtrl: PopoverController
  )
  {
    this.valoration = 0;
  }

  ngOnInit() { this.fillValoration(this.rating);  }

  sendRate() {
    this.spotService.rate(this.spot, this.valoration)
      .subscribe();
    this.popCtrl.dismiss();
  }

  fillValoration(value) {

    this.itemsValoration.map( i => i.icon = i.value <= value ? 'star' : 'star-outline' );
    this.valoration = value;

  }

}
