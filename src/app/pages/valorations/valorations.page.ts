import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotValorated } from 'src/app/interfaces/spot.interface';
import { SpotService } from 'src/app/services/spot.service';

@Component({
  selector: 'app-valorations',
  templateUrl: './valorations.page.html',
  styleUrls: ['./valorations.page.scss'],
})
export class ValorationsPage implements OnInit {

  spots: Observable<SpotValorated[]>;

  constructor( private spotService: SpotService ) { }

  ngOnInit() {
    this.spots = this.spotService.getValorations(); 
  }
}
