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

  spots: SpotValorated[] = [];
  stars: [] = [];
  star = {
    NULL: 0,
    HALF: 1,
    COMPLETE: 2
  }

  constructor( private spotService: SpotService ) { }

  ngOnInit() {
    this.spotService.getValorations().subscribe( (data) => {
      this.spots = data;
      this.getValorations();
      console.log(this.spots);
      
    });
  }

  getValorations(): void {
    this.spots.map( (spot: SpotValorated) => {
      const rating = Number(spot.rating);
      let i = Math.trunc(rating);
      let d = Number( ( rating - i).toFixed(1) );
      const add = d < 0.3 ? this.star.NULL : d >= 0.3 && d < 0.8 ? this.star.HALF : this.star.COMPLETE;
      const starComplete = add === this.star.COMPLETE ? i + 1 : i;
      const starHalf = add === this.star.HALF ? 1 : 0;
      const stars = [ ...'star,'.repeat(starComplete).split(','), ...'star-half,'.repeat(starHalf).split(',') ].filter( (e) => e !== '' );
      spot.prueba = stars;
      return spot;
    });
  }

}
