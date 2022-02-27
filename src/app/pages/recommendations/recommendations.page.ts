import { Component, OnInit } from '@angular/core';
import { SpotService } from '../../services/spot.service';
import { SpotRecommended } from '../../interfaces/spot.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit {

  spots: Observable<SpotRecommended[]>;

  constructor( private spotService: SpotService ) { }

  ngOnInit() {
    this.spots = this.spotService.getRecommendations();
  }

}
