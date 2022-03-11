import { Component, Input, OnInit } from '@angular/core';
import { STAR } from 'src/app/constants/spot.constants';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() rating = 0;
  stars: String[] = [];

  constructor() { }

  ngOnInit() {
    this.generateRating();
  }

  generateRating() {    
    const rating = Number(this.rating);
    const partInteger = Math.trunc(rating);
    const partDecimal = Number( (rating - partInteger).toFixed(1) );
    const complement = partDecimal < 0.3 ? STAR.NULL : partDecimal >= 0.3 && partDecimal < 0.8 ? STAR.HALF : STAR.COMPLETE;
    const starComplete = complement === STAR.COMPLETE ? partInteger + 1 : partInteger;
    const starHalf = complement === STAR.HALF ? 1 : 0;
    this.stars = [ ...'star,'.repeat(starComplete).split(','), ...'star-half,'.repeat(starHalf).split(',') ].filter( (e) => e !== '' );
  }
}
